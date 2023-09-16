import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {AttemptsService} from './attempts.service';

import {Attempt, AttemptSchema} from './attempt.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Attempt.name, schema: AttemptSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		AttemptsService
	],
	exports: [
		AttemptsService
	]
})
export class AttemptsModule {}
