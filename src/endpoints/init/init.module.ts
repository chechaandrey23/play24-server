import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import {InitService} from './init.service';

import {MediaryInitsModule} from '../../mediaries/init/inits/mediary.inits.module';

@Module({
	imports: [
		ConfigModule,
    MediaryInitsModule,
	],
	controllers: [],
	providers: [
		InitService,
	],
	exports: [
		InitService
	]
})
export class InitModule {}
