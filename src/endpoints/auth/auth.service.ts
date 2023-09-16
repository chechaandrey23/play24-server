import {ConflictException, NotAcceptableException, HttpException, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import {AuthCookiesService} from '../../secondaries/auth-cookies/auth.cookies.service';

import {MediaryUsersService} from '../../mediaries/auth/users/mediary.users.service';
import {MediaryRefreshTokensService} from '../../mediaries/auth/refresh-tokens/mediary.refresh.tokens.service';

import {User, UserDocument} from '../../entries/users/user.model';
import {RefreshToken, RefreshTokenDocument} from '../../entries/refresh-tokens/refresh.token.model';
import {Role, RoleDocument} from '../../entries/roles/role.model';

import {
  AccessTokenPayloadInterafce, RefreshTokenPayloadInterafce,
  LoginInterface, MainLoginInterface, LogoutInterface,
  RefreshInterface,
  GetRolesInterface,
  RegistrationInterface,
  GetUserInterface,
} from './auth.interface';

import {
  ExpressUser, ExpressUserAccessToken, ExpressUserRefreshToken,
} from './strategies/strategies.interface';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
    private configService: ConfigService,
    private authCookiesService: AuthCookiesService,
    private mediaryUsersService: MediaryUsersService,
    private mediaryRefreshTokensService: MediaryRefreshTokensService,
	) {}

  public async login(req: Request, payload: LoginInterface): Promise<UserDocument> {
    // get user data
    const user = await this.mediaryUsersService.getUser({id: payload.userId});

    const res: UserDocument =  await this.mainLogin(req, {user: user, userAgent: payload.userAgent, ip: payload.ip});

    req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());

    return res;
  }

  public async mainLogin(req: Request, payload: MainLoginInterface): Promise<UserDocument> {
    const accessToken = await this.generateAccessToken({
      id: payload.user.id,
      roles: payload.user.roles.map((entry) => (entry.role)),
    });
		//const refreshToken = await this.generateRefreshToken({id: user.id, roles: user.roles});
    const o = {refreshToken: null};

    const config = this.configService.get('jwt');
    // add refreshToken
    await this.mediaryRefreshTokensService.createRefreshToken({
      userId: payload.user.id,
      //refreshToken: refreshToken,
      refreshTokenLifetime: config.jwtRefreshExpirationTime,
      userAgent: payload.userAgent,
      ip: payload.ip,
    }, async (payload2: {refreshTokenId: string}) => {
      o.refreshToken = await this.generateRefreshToken({
        id: payload.user.id,
        roles: (payload.user.roles as Array<RoleDocument>).map((entry: RoleDocument): number => (entry.role)),
        ...payload2,
      });

      return o.refreshToken;
    });

    // write Cookies
    this.authCookiesService.add('AccessToken', accessToken, true, config.jwtAccessExpirationTime);
    this.authCookiesService.add('RefreshToken', o.refreshToken, true, config.jwtRefreshExpirationTime);

    return payload.user;
  }

  public async logout(req: Request, payload: LogoutInterface): Promise<void> {
    this.authCookiesService.deleteAll();

    if(payload.userId) {
      if(payload.fullExit) {
        await this.mediaryRefreshTokensService.deleteAllRefreshTokens({
          userId: payload.userId
        });
      } else {
        await this.mediaryRefreshTokensService.deleteRefreshToken({
          userId: payload.userId,
          refreshTokenId: payload.refreshTokenId,
          //userAgent: payload.userAgent,
          //ip: payload.ip,
        });
      }
    } else {
      console.log('Silent LogOut!!!!!');
    }

    req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
  }

  public async getRoles(req: Request, payload: GetRolesInterface): Promise<Array<RoleDocument>> {
    return await this.mediaryUsersService.getRoles({});
  }

  public async registration(req: Request, payload: RegistrationInterface): Promise<UserDocument> {
    const user = await this.mediaryUsersService.createUser({
      username: payload.username,
      password: payload.password,
      roleIds: payload.roles,
    });

    const res: UserDocument = await this.mainLogin(req, {user: user, userAgent: payload.userAgent, ip: payload.ip});

    req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());

    return res;
  }

  public async getUser(req: Request, payload: GetUserInterface): Promise<UserDocument> {
    return await this.mediaryUsersService.getUser({id: payload.userId});
  }

  public async refresh(req: Request, payload: RefreshInterface): Promise<UserDocument> {
    const user = await this.mediaryUsersService.getUser({id: payload.userId});

    const reqUser = req.user as ExpressUserRefreshToken;
    const accessToken = await this.generateAccessToken({
      id: user.id,
      roles: ((user.roles as Array<RoleDocument>).map((entry: RoleDocument): number => (entry.role))),
    });
		const refreshToken = await this.generateRefreshToken({
      id: user.id,
      refreshTokenId: payload.refreshTokenId,
      roles: ((user.roles as Array<RoleDocument>).map((entry: RoleDocument): number => (entry.role))),
    });

    // updateRefreshToken => (replace) => refreshRefreshToken
    try {
      const config = this.configService.get('jwt');
      
      await this.mediaryRefreshTokensService.refreshRefreshToken({
        refreshTokenId: payload.refreshTokenId,
        userId: user.id,
        newRefreshToken: refreshToken,
        cookieRefreshToken: req.cookies?.RefreshToken,
        refreshTokenLifetime: config.jwtRefreshExpirationTime,
        userAgent: payload.userAgent,
        ip: payload.ip,
      });

      // write Cookies
      this.authCookiesService.add('AccessToken', accessToken, true, config.jwtAccessExpirationTime);
      this.authCookiesService.add('RefreshToken', refreshToken, true, config.jwtRefreshExpirationTime);

      req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
		} catch(e) {
			if(e instanceof HttpException) {
        this.authCookiesService.deleteAll();
				//req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
			}
			throw e;
		}

    return user;
  }

  protected async generateAccessToken(payload: AccessTokenPayloadInterafce): Promise<string> {
    const config = this.configService.get('jwt');
    return this.jwtService.sign/*<AccessTokenPayloadInterafce>*/(payload, {
			secret: config.jwtAccessSecret,
			expiresIn: config.jwtAccessExpirationTime * 1000,
		});
  }

  protected async generateRefreshToken(payload: RefreshTokenPayloadInterafce): Promise<string> {
    const config = this.configService.get('jwt');
    return this.jwtService.sign/*<RefreshTokenPayloadInterafce>*/(payload, {
			secret: config.jwtRefreshSecret,
			expiresIn: config.jwtRefreshExpirationTime * 1000,
		});
  }
}
