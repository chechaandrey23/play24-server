import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {AuthCookiesService} from './auth.cookies.service';

@Module({
	imports: [
    ConfigModule,
	],
	controllers: [],
	providers: [
		AuthCookiesService
	],
	exports: [
		AuthCookiesService
	]
})
export class AuthCookiesModule {}
