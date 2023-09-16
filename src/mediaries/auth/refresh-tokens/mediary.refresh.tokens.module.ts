import {Module} from '@nestjs/common';

import {MediaryRefreshTokensService} from './mediary.refresh.tokens.service';

import {HashsModule} from '../../../secondaries/hashs/hashs.module';

import {UsersModule} from '../../../entries/users/users.module';
import {RefreshTokensModule} from '../../../entries/refresh-tokens/refresh.tokens.module';
import {RefreshTokenHashsModule} from '../../../entries/refresh-token-hashs/refresh.token.hashs.module';

@Module({
	imports: [
    HashsModule,
		UsersModule,
    RefreshTokensModule,
    RefreshTokenHashsModule,
	],
	controllers: [],
	providers: [
		MediaryRefreshTokensService,
	],
	exports: [
		MediaryRefreshTokensService,
	]
})
export class MediaryRefreshTokensModule {}
