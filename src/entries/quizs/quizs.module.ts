import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {QuizsService} from './quizs.service';

import {Quiz, QuizSchema} from './quiz.model';
import {Question, QuestionSchema} from '../questions/question.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Quiz.name, schema: QuizSchema},
			{name: Question.name, schema: QuestionSchema},
		], MONGO_FIRST_CONNECT_NAME),
	],
	controllers: [],
	providers: [
		QuizsService
	],
	exports: [
		QuizsService
	]
})
export class QuizsModule {}
