import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MongooseSession, TypeMethodWithSession } from '../../../utils/mongoose.session';
import { QuizsService } from '../../../entries/quizs/quizs.service';
import { ResultsService } from '../../../entries/results/results.service';
import { UsersService } from '../../../entries/users/users.service';
import { AttemptsService } from '../../../entries/attempts/attempts.service';
import { QuizDocument } from '../../../entries/quizs/quiz.model';
import { AttemptDocument } from '../../../entries/attempts/attempt.model';
import { GetResultsForQuizInterface, ResetResultQuizInterface } from './mediary.results.interface';
export declare class MediaryResultsService implements MongooseSession {
    protected connection: Connection;
    private configService;
    private usersService;
    private quizsService;
    private resultsService;
    private attemptsService;
    constructor(connection: Connection, configService: ConfigService, usersService: UsersService, quizsService: QuizsService, resultsService: ResultsService, attemptsService: AttemptsService);
    withSession: TypeMethodWithSession;
    getResultsForQuiz(payload: GetResultsForQuizInterface): Promise<QuizDocument>;
    resetResultQuiz(payload: ResetResultQuizInterface): Promise<AttemptDocument>;
}
