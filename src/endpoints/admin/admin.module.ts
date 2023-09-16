import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import {AdminService} from './admin.service';
import {AdminController} from './admin.controller';

import {JwtAccessStrategy} from '../auth/strategies/jwt.access.strategy';

import {MediaryQuizsModule as MediaryUserQuizsModule} from '../../mediaries/user/quizs/mediary.quizs.module';

import {MediaryQuizsModule} from '../../mediaries/admin/quizs/mediary.quizs.module';
import {MediaryResultsModule} from '../../mediaries/admin/results/mediary.results.module';

import {UserRolesModule} from '../../secondaries/user-roles/user.roles.module';

@Module({
	imports: [
		ConfigModule,
    UserRolesModule,
    MediaryUserQuizsModule,
		MediaryQuizsModule,
    MediaryResultsModule,
	],
	controllers: [
		AdminController
	],
	providers: [
		AdminService,
		JwtAccessStrategy,
	],
	exports: [
		AdminService
	]
})
export class AdminModule {}
