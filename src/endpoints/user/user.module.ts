import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import {UserService} from './user.service';
import {UserController} from './user.controller';

import {JwtAccessStrategy} from '../auth/strategies/jwt.access.strategy';

import {MediaryQuizsModule} from '../../mediaries/user/quizs/mediary.quizs.module';

import {UserRolesModule} from '../../secondaries/user-roles/user.roles.module';

@Module({
	imports: [
		ConfigModule,
    UserRolesModule,
		MediaryQuizsModule,
	],
	controllers: [
		UserController
	],
	providers: [
		UserService,
		JwtAccessStrategy,
	],
	exports: [
		UserService
	]
})
export class UserModule {}
