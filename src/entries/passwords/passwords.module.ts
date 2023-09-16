import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {PasswordsService} from './passwords.service';

import {Password, PasswordSchema} from './password.model';

import {HashsModule} from '../../secondaries/hashs/hashs.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Password.name, schema: PasswordSchema},
		], MONGO_FIRST_CONNECT_NAME),
		HashsModule
	],
	controllers: [],
	providers: [
		PasswordsService
	],
	exports: [
		PasswordsService
	]
})
export class PasswordsModule {}
