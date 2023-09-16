import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {QuestionTypesService} from './question.types.service';

import {QuestionType, QuestionTypeSchema} from './question.type.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: QuestionType.name, schema: QuestionTypeSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		QuestionTypesService
	],
	exports: [
		QuestionTypesService
	]
})
export class QuestionTypesModule {}
