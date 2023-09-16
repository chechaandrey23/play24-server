import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {UsersService} from './users.service';

import {User, UserSchema} from './user.model';
import {Role, RoleSchema} from '../roles/role.model';

import {UserRolesModule} from '../../secondaries/user-roles/user.roles.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: User.name, schema: UserSchema},
			{name: Role.name, schema: RoleSchema},
		], MONGO_FIRST_CONNECT_NAME),
		UserRolesModule
	],
	controllers: [],
	providers: [
		UsersService
	],
	exports: [
		UsersService
	]
})
export class UsersModule {}
