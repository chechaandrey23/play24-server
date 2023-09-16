import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {MediaryQuizsService} from './mediary.quizs.service';

import {QuizsModule} from '../../../entries/quizs/quizs.module';
import {QuestionsModule} from '../../../entries/questions/questions.module';
import {QuestionTypesModule} from '../../../entries/question-types/question.types.module';
import {ResultsModule} from '../../../entries/results/results.module';
import {UsersModule} from '../../../entries/users/users.module';
import {AttemptsModule} from '../../../entries/attempts/attempts.module';

@Module({
	imports: [
    ConfigModule,
    UsersModule,
    QuizsModule,
    QuestionsModule,
    QuestionTypesModule,
    ResultsModule,
		AttemptsModule,
	],
	controllers: [],
	providers: [
		MediaryQuizsService,
	],
	exports: [
		MediaryQuizsService,
	]
})
export class MediaryQuizsModule {}
