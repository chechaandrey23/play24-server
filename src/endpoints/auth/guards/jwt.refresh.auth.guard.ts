import {Injectable, Inject} from '@nestjs/common';
import {UnauthorizedException, HttpException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import {AuthCookiesService} from '../../../secondaries/auth-cookies/auth.cookies.service';

@Injectable()
export class JWTRefreshAuthGuard extends AuthGuard('jwt-refresh') {
	constructor(
		@Inject(AuthCookiesService) private authCookiesService: AuthCookiesService,
	) {
		super();
	}

	handleRequest(err: any, user: any, info: any, context: any, status: any): any {// ???
		if(err) throw new HttpException(err.message, err.status);
		if(!user) {
			this.authCookiesService.deleteAll();
			context.getResponse().setHeader('Set-Cookie', this.authCookiesService.toArrayString());
			throw new UnauthorizedException(info.message);
		}
		return user;
	}
}
