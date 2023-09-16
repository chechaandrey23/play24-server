import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {RefreshTokensService} from './refresh.tokens.service';

import {RefreshToken, RefreshTokenSchema} from './refresh.token.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: RefreshToken.name, schema: RefreshTokenSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		RefreshTokensService
	],
	exports: [
		RefreshTokensService
	]
})
export class RefreshTokensModule {}
