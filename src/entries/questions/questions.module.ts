import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {QuestionsService} from './questions.service';

import {Question, QuestionSchema} from './question.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Question.name, schema: QuestionSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		QuestionsService
	],
	exports: [
		QuestionsService
	]
})
export class QuestionsModule {}
