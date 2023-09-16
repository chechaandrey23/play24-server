import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, Inject} from '@nestjs/common';
import {Request} from 'express';
import {ConfigService} from '@nestjs/config';

import {MediaryUsersService} from '../../../mediaries/auth/users/mediary.users.service';
import {User, UserDocument} from '../../../entries/users/user.model';

import {
	ExpressUserAccessToken, ExpressUserRefreshToken,
} from './strategies.interface';

export interface JWTRefreshPaylaodInterface {
	id: string;
	refreshTokenId: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private configService: ConfigService,
		private mediaryUsersService: MediaryUsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				return request?.cookies?.RefreshToken;
			}]),
			ignoreExpiration: false,
			secretOrKey: configService.get('jwt').jwtRefreshSecret,
			//secretOrKeyProvider: (request, rawJwtToken, done) => {
			//	done(null, this.configService.get('jwt').jwtRefreshSecret);
			//},
			passReqToCallback: true,
		});
	}

	public async validate(ctx: any, payload: JWTRefreshPaylaodInterface): Promise<ExpressUserRefreshToken> {
		const user: UserDocument = await this.mediaryUsersService.checkUserId({
			userId: payload.id,
		});
		return {
			id: user.id,
			roles: user.roles.map((entry) => (entry.role)),
			refreshTokenId: payload.refreshTokenId,
		}
	}
}
