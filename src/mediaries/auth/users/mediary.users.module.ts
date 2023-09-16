import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {MediaryUsersService} from './mediary.users.service';

import {HashsModule} from '../../../secondaries/hashs/hashs.module';

import {UsersModule} from '../../../entries/users/users.module';
import {RolesModule} from '../../../entries/roles/roles.module';
import {PasswordsModule} from '../../../entries/passwords/passwords.module';

@Module({
	imports: [
    ConfigModule,
    HashsModule,
		UsersModule,
    RolesModule,
    PasswordsModule,
	],
	controllers: [],
	providers: [
		MediaryUsersService,
	],
	exports: [
		MediaryUsersService,
	]
})
export class MediaryUsersModule {}
