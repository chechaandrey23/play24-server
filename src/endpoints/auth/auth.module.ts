import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import {AuthCookiesModule} from '../../secondaries/auth-cookies/auth.cookies.module';

import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';

import {LocalStrategy} from './strategies/local.strategy';
import {JwtAccessStrategy} from './strategies/jwt.access.strategy';
import {JwtRefreshStrategy} from './strategies/jwt.refresh.strategy';

import {MediaryUsersModule} from '../../mediaries/auth/users/mediary.users.module';
import {MediaryRefreshTokensModule} from '../../mediaries/auth/refresh-tokens/mediary.refresh.tokens.module';

@Module({
	imports: [
		PassportModule.register({
			session: false,
		}),
		JwtModule,
		ConfigModule,
		AuthCookiesModule,
		MediaryUsersModule,
		MediaryRefreshTokensModule,
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtAccessStrategy,
		JwtRefreshStrategy,
	],
	exports: [
		AuthService
	]
})
export class AuthModule {}
