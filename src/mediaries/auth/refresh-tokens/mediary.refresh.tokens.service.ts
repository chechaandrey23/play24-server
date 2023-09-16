import {Injectable} from '@nestjs/common';
import {HttpException, HttpStatus, ConflictException, NotAcceptableException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Model, Connection, ClientSession} from 'mongoose';
import {mixin} from '../../../utils/mixin';
import {handlerError} from '../../../utils/handler.error';
import {MongooseSession, TypeMethodWithSession} from '../../../utils/mongoose.session';
import {InjectConnection} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../../configs';

import {HashsService} from '../../../secondaries/hashs/hashs.service';

import {UsersService} from '../../../entries/users/users.service';
import {RefreshTokensService} from '../../../entries/refresh-tokens/refresh.tokens.service';
import {RefreshToken, RefreshTokenDocument} from '../../../entries/refresh-tokens/refresh.token.model';
import {RefreshTokenHashsService} from '../../../entries/refresh-token-hashs/refresh.token.hashs.service';
import {RefreshTokenHash, RefreshTokenHashDocument} from '../../../entries/refresh-token-hashs/refresh.token.hash.model';

import {
  CreateRefreshTokenInterface,
  DeleteAllRefreshTokensInterface, DeleteRefreshTokenInterface,
  RefreshRefreshTokenInterface, CompareRefreshTokenHashInterface,
  CheckRefreshTokenInterface,
} from './mediary.refresh.tokens.interface';

@Injectable()
export class MediaryRefreshTokensService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
    private configService: ConfigService,
    private hashsService: HashsService,
    private usersService: UsersService,
    private refreshTokensService: RefreshTokensService,
    private refreshTokenHashsService: RefreshTokenHashsService,
	) {}

  public withSession: TypeMethodWithSession;

  public async checkRefreshToken(payload: CheckRefreshTokenInterface): Promise<RefreshTokenDocument|null> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const res = await this.refreshTokensService.getRefreshToken({
          session,
          id: payload.refreshTokenId,
          userId: payload.userId,
          where: {$or: [{dateEnd: {$exists: false}}, {dateEnd: null}, {dateEnd: {$lt: new Date()}}]},
        });

        return res;
      });
    } catch(e) {
			handlerError(e);
		}
  }

  public async createRefreshToken(payload: CreateRefreshTokenInterface, fn: (payload?: object) => Promise<string>): Promise<RefreshTokenDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('refresh-token');

        const countRefreshTokens = await this.refreshTokensService.countRefreshTokens({
          session,
          userId: payload.userId,
        });

        if(config.countUserRefreshTokens > countRefreshTokens) {
          const refreshToken = await this.refreshTokensService.createRefreshToken({
            session,
            userId: payload.userId,
            dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
            ip: payload.ip,
            userAgent: payload.userAgent,
          });

          const refreshTokenString = await fn({refreshTokenId: refreshToken.id});

          const hash = await this.hashsService.toHash(HashsService['SALT_REFRESH_TOKEN'], refreshTokenString);

          const refreshTokenHash = await this.refreshTokenHashsService.createRefreshTokenHash({
            session,
            refreshTokenId: refreshToken.id,
            token: hash,
          });

          await this.refreshTokensService.updateRefreshTokenHashSet({
            session,
            id: refreshToken.id,
            refreshTokenHashId: refreshTokenHash.id,
          });

          await this.usersService.updateRefreshTokensPush({
            id: payload.userId,
            refreshTokenId: refreshToken.id,
            session,
          });

          return await this.refreshTokensService.getRefreshToken({
            id: refreshToken.id,
            userId: payload.userId,
            withRefreshTokenHash: false,
            session,
          });
        } else {
          const refreshToken = await this.refreshTokensService.replaceExpiredRefreshToken({
            session,
            userId: payload.userId,
            dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
            ip: payload.ip,
            userAgent: payload.userAgent,
          });

          const refreshTokenString = await fn({refreshTokenId: refreshToken.id});

          const hash = await this.hashsService.toHash(HashsService['SALT_REFRESH_TOKEN'], refreshTokenString);

          const refreshTokenHash = await this.refreshTokenHashsService.replaceRefreshTokenHash({
            session,
            id: (refreshToken.refreshTokenHash as RefreshTokenHashDocument).id,
            refreshTokenId: refreshToken.id,
            token: hash,
          });

          return refreshToken;
        }
      });
    } catch(e) {
			handlerError(e);
		}
  }

  public async deleteAllRefreshTokens({userId}: DeleteAllRefreshTokensInterface): Promise<void> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const refreshTokens = await this.refreshTokensService.eraseAllRefreshTokens({
          userId: userId,
          session,
        });
        const refreshTokenHashs = await this.refreshTokenHashsService.eraseAllRefreshTokenHashs({
          ids: refreshTokens.map((entry: RefreshTokenDocument): string => ((entry.refreshTokenHash as RefreshTokenHashDocument).id)),
          refreshTokenIds: refreshTokens.map((entry: RefreshTokenDocument): string => (entry.id)),
          session,
        });
        //await this.usersService.updateRefreshTokensPullAll({
        //  session,
        //  id: userId,
        //  refreshTokenIds: refreshTokens.map((entry: RefreshTokenDocument): string => (entry.id)),
        //});
      });
    } catch(e) {
			handlerError(e);
		}
  }

  public async deleteRefreshToken({userId, refreshTokenId}: DeleteRefreshTokenInterface): Promise<void> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const refreshToken = await this.refreshTokensService.eraseRefreshToken({
          id: refreshTokenId,
          userId: userId,
          session,
        });

        const refreshTokenHash = await this.refreshTokenHashsService.eraseRefreshTokenHash({
          id: (refreshToken.refreshTokenHash as RefreshTokenHashDocument).id,
          refreshTokenId: refreshToken.id,
          session,
        });

        //await this.usersService.updateRefreshTokensPull({
        //  session,
        //  id: userId,
        //  refreshTokenId: refreshToken.id,
        //});
      });
    } catch(e) {
			handlerError(e);
		}
  }

  public async refreshRefreshToken(payload: RefreshRefreshTokenInterface): Promise<RefreshTokenDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const refreshToken = await this.refreshTokensService.refreshRefreshToken({
          session,
          id: payload.refreshTokenId,
          userId: payload.userId,
          dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
          ip: payload.ip,
          userAgent: payload.userAgent,
        });

        // check Error in refreshToken

        if(!await this.compareRefreshTokenHash({
          refreshTokenId: refreshToken.id,
          token: payload.cookieRefreshToken,
          session: session,
        })) {
          throw new NotAcceptableException(`Refresh Token is INCORRECT`);
        }

        const hash = await this.hashsService.toHash(HashsService['SALT_REFRESH_TOKEN'], payload.newRefreshToken);

        const refreshTokenHash = await this.refreshTokenHashsService.replaceRefreshTokenHash({
          session,
          id: (refreshToken.refreshTokenHash as RefreshTokenHashDocument).id,
          refreshTokenId: refreshToken.id,
          token: hash,
        });

        return refreshToken;
      });
    } catch(e) {
			handlerError(e);
		}
  }

  public async compareRefreshTokenHash(payload: CompareRefreshTokenHashInterface): Promise<boolean> {
    const refreshTokenHash: RefreshTokenHash = await this.refreshTokenHashsService.getRefreshTokenHash({
      refreshTokenId: payload.refreshTokenId,
      session: payload.session,
    });
    return await this.hashsService.compareHashSample(
      HashsService['SALT_REFRESH_TOKEN'],
      refreshTokenHash.hash,
      payload.token,
    );
  }
}

mixin(MediaryRefreshTokensService, [MongooseSession]);
