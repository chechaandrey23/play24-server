import {Request, Response, NextFunction} from 'express';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, Inject} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {
	ExpressUserAccessToken, ExpressUserRefreshToken,
} from './strategies.interface';

export interface JWTAccessPaylaodInterface {
	id: string;
	roles: Array<number>;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(
		private configService: ConfigService,
	) {
		super({
			//jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				return request?.cookies?.AccessToken;
			}]),
			ignoreExpiration: false,
			secretOrKey: configService.get('jwt').jwtAccessSecret,
			//secretOrKeyProvider: (request, rawJwtToken, done) => {
			//	done(null, this.configService.get('jwt').jwtAccessSecret);
			//},
			//passReqToCallback: true
			passReqToCallback: true,
		});
	}

	public async validate(ctx: any, payload: JWTAccessPaylaodInterface): Promise<ExpressUserAccessToken> {
		// without query to db!!!
		return {
			id: payload.id,
			roles: payload.roles,
		}
		//return {id: payload.id, roles: payload.roles};
	}
}
