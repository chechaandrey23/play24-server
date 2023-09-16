import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {MediaryResultsService} from './mediary.results.service';

import {QuizsModule} from '../../../entries/quizs/quizs.module';
import {ResultsModule} from '../../../entries/results/results.module';
import {UsersModule} from '../../../entries/users/users.module';
import {AttemptsModule} from '../../../entries/attempts/attempts.module';

@Module({
	imports: [
    ConfigModule,
    UsersModule,
    QuizsModule,
    ResultsModule,
		AttemptsModule,
	],
	controllers: [],
	providers: [
		MediaryResultsService,
	],
	exports: [
		MediaryResultsService,
	]
})
export class MediaryResultsModule {}
