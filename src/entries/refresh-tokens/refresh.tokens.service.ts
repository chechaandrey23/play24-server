import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {RefreshToken, RefreshTokenDocument, RefreshTokenSchema, RefreshTokenModel} from './refresh.token.model';

import {
  GetRefreshTokenInterface, CountRefreshTokensInterface,
  CreateRefreshTokenInterface, ReplaceExpiredRefreshTokenInterface,
  RefreshRefreshTokenInterface,
  EraseAllRefreshTokensInterface, EraseRefreshTokenInterface,
  UpdateRefreshTokenHashSetInterface,
} from './refresh.tokens.interface';

@Injectable()
export class RefreshTokensService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(RefreshToken.name, MONGO_FIRST_CONNECT_NAME) private refreshTokens: RefreshTokenModel,
	) {}

  public async getRefreshToken(payload: GetRefreshTokenInterface): Promise<RefreshTokenDocument> {
    return await this.refreshTokens.findOne({
			...(payload.id?{_id: payload.id}:{}),
			...(payload.userId?{user: payload.userId}:{}),
		}, {}, {
			session: payload.session,
      populate: [
				...(payload.withRefreshTokenHash?[{
						path: 'refreshTokenHash',
						select: {},
						options: {session: payload.session}
					}]:[]),
			]
		});
  }

  public async countRefreshTokens(payload: CountRefreshTokensInterface): Promise<number> {
    return await this.refreshTokens.countDocuments(
				{
					...(payload.userId?{user: payload.userId}:{}),
				},
				{session: payload.session}
			);
  }

  public async createRefreshToken(payload: CreateRefreshTokenInterface): Promise<RefreshTokenDocument> {
    const [refreshToken] = await this.refreshTokens.create([{
			user: payload.userId,
			ip: payload.ip || '',
			userAgent: payload.userAgent || '',
			dateEnd: new Date(payload.dateEnd),
		}], {session: payload.session});
		return refreshToken;
  }

  public async replaceExpiredRefreshToken(payload: ReplaceExpiredRefreshTokenInterface): Promise<RefreshTokenDocument> {
    const refreshToken = await this.refreshTokens.findOne(
			{$and: [
				{user: payload.userId},
				{$or: [{dateEnd: {$exists: false}}, {dateEnd: null}, {dateEnd: {$lt: new Date()}}]}
			]},
			null,
			{session: payload.session}
		);

    if(!refreshToken) {
			throw new ConflictException(`No slot for refresh token at update refresh token`);
		} else {
			await this.refreshTokens.updateOne(
				{
          _id: refreshToken.id,
          user: payload.userId
        },
				{
					ip: payload.ip || '',
					userAgent: payload.userAgent || '',
					dateEnd: new Date(payload.dateEnd),
				},
				{session: payload.session}
			);
      return await this.getRefreshToken({
        id: refreshToken.id,
        userId: payload.userId,
        withRefreshTokenHash: true,
        session: payload.session,
      });
		}
  }

  public async eraseAllRefreshTokens(payload: EraseAllRefreshTokensInterface): Promise<Array<RefreshTokenDocument>> {
    const currentRefreshTokens = await this.refreshTokens.find({
				user: payload.userId,
			}, ['id'], {
        session: payload.session});

    await this.refreshTokens.updateMany(
			{_id: {$in: (currentRefreshTokens as Array<RefreshTokenDocument>).map((entry) => entry.id)}},
			{$unset: {ip: "", userAgent: "", dateEnd: ""}},
			{session: payload.session}
		);

    return await this.refreshTokens.find({
			user: payload.userId,
		}, {}, {
      session: payload.session,
      populate: [{
        path: 'refreshTokenHash',
        select: '-hash',
        options: {session: payload.session}
      }]
    });
  }

  public async eraseRefreshToken(payload: EraseRefreshTokenInterface): Promise<RefreshTokenDocument> {
    await this.refreshTokens.updateOne(
			{_id: payload.id, user: payload.userId},
			{$unset: {ip: "", userAgent: "", dateEnd: ""}},
			{session: payload.session}
		);

    return await this.getRefreshToken({
      id: payload.id,
      userId: payload.userId,
      withRefreshTokenHash: true,
      session: payload.session,
    });
  }

  public async refreshRefreshToken(payload: RefreshRefreshTokenInterface): Promise<RefreshTokenDocument> {
    await this.refreshTokens.updateOne(
      {
        _id: payload.id,
        user: payload.userId,
        $and: [
          {dateEnd: {$exists: false}},
          {dateEnd: null},
          {dateEnd: {$lt: new Date()}},
        ]
      },
      {
        ip: payload.ip || '',
        userAgent: payload.userAgent || '',
        dateEnd: new Date(payload.dateEnd),
      },
      {session: payload.session}
    );

    return await this.getRefreshToken({
      id: payload.id,
      userId: payload.userId,
      withRefreshTokenHash: true,
      session: payload.session,
    });
  }

  public async updateRefreshTokenHashSet(payload: UpdateRefreshTokenHashSetInterface): Promise<boolean> {
    const res = await this.refreshTokens.updateOne(
			{_id: payload.id},
			{$set: {refreshTokenHash: payload.refreshTokenHashId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }
}
