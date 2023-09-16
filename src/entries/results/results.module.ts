import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {ResultsService} from './results.service';

import {Result, ResultSchema} from './result.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Result.name, schema: ResultSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		ResultsService
	],
	exports: [
		ResultsService
	]
})
export class ResultsModule {}
