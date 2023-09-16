import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {UserRolesService} from './user.roles.service';

@Module({
	imports: [
    ConfigModule
	],
	controllers: [],
	providers: [
		UserRolesService
	],
	exports: [
		UserRolesService
	]
})
export class UserRolesModule {}
