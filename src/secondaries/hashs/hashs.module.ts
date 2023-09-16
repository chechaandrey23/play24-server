import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {HashsService} from './hashs.service';

@Module({
	imports: [
    ConfigModule
	],
	controllers: [],
	providers: [
		HashsService
	],
	exports: [
		HashsService
	]
})
export class HashsModule {}
