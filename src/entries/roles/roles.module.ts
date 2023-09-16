import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {RolesService} from './roles.service';

import {Role, RoleSchema} from './role.model';
import {User, UserSchema} from '../users/user.model';

import {UserRolesModule} from '../../secondaries/user-roles/user.roles.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Role.name, schema: RoleSchema},
			{name: User.name, schema: UserSchema},
		], MONGO_FIRST_CONNECT_NAME),
		UserRolesModule,
	],
	controllers: [],
	providers: [
		RolesService
	],
	exports: [
		RolesService
	]
})
export class RolesModule {}
