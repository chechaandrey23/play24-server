import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {RefreshTokenHashsService} from './refresh.token.hashs.service';

import {RefreshTokenHash, RefreshTokenHashSchema} from './refresh.token.hash.model';

import {HashsModule} from '../../secondaries/hashs/hashs.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: RefreshTokenHash.name, schema: RefreshTokenHashSchema},
		], MONGO_FIRST_CONNECT_NAME),
		HashsModule
	],
	controllers: [],
	providers: [
		RefreshTokenHashsService
	],
	exports: [
		RefreshTokenHashsService
	]
})
export class RefreshTokenHashsModule {}
