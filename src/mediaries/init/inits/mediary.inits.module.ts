import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {MediaryInitsService} from './mediary.inits.service';

import {QuizsModule} from '../../../entries/quizs/quizs.module';
import {QuestionsModule} from '../../../entries/questions/questions.module';
import {QuestionTypesModule} from '../../../entries/question-types/question.types.module';
import {UsersModule} from '../../../entries/users/users.module';
import {RolesModule} from '../../../entries/roles/roles.module';

import {UserRolesModule} from '../../../secondaries/user-roles/user.roles.module';

@Module({
	imports: [
    ConfigModule,
    UsersModule,
    RolesModule,
    QuizsModule,
    QuestionsModule,
    QuestionTypesModule,
    UserRolesModule,
	],
	controllers: [],
	providers: [
		MediaryInitsService,
	],
	exports: [
		MediaryInitsService,
	]
})
export class MediaryInitsModule {}
