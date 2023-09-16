import {Injectable} from '@nestjs/common';
import {HttpException, HttpStatus, ConflictException, NotAcceptableException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Model, Connection, ClientSession} from 'mongoose';
import {mixin} from '../../../utils/mixin';
import {handlerError} from '../../../utils/handler.error';
import {MongooseSession, TypeMethodWithSession} from '../../../utils/mongoose.session';
import {InjectConnection} from '@nestjs/mongoose';

import {MONGO_FIRST_CONNECT_NAME} from '../../../configs';

import {QuizsService} from '../../../entries/quizs/quizs.service';
import {ResultsService} from '../../../entries/results/results.service';
import {UsersService} from '../../../entries/users/users.service';
import {AttemptsService} from '../../../entries/attempts/attempts.service';

import {Quiz, QuizDocument} from '../../../entries/quizs/quiz.model';
import {Result, ResultDocument} from '../../../entries/results/result.model';
import {User, UserDocument} from '../../../entries/users/user.model';
import {Attempt, AttemptDocument} from '../../../entries/attempts/attempt.model';

import {
  GetResultsForQuizInterface,
  ResetResultQuizInterface,
} from './mediary.results.interface';

@Injectable()
export class MediaryResultsService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
    private configService: ConfigService,
    private usersService: UsersService,
    private quizsService: QuizsService,
    private resultsService: ResultsService,
    private attemptsService: AttemptsService,
	) {}

  public withSession: TypeMethodWithSession;

  public async getResultsForQuiz(payload: GetResultsForQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          draft: false,
          withAttempts: true,
          attemptsWhere: {
            // user: ??????
            quiz: payload.quizId,
            irRelevant: false,
          },
          withAttemptUser: true,
        	withAttemptResults: true,
        	attemptResultsWhere: {
            // user: ??????
            quiz: payload.quizId,
          },
          withQuestions: true,
          questionsWhere: {draft: false},
          withQuestionType: true,
        });
        /*
        const config = this.configService.get('attempts');
        return await this.attemptsService.getAllAttempts({
          session,
          quizId: payload.quizId,
          irRelevant: true,
          withResults: true,
          limit: config.defaultMaxAttempts,
          offset: 0,
        });
        */
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async resetResultQuiz(payload: ResetResultQuizInterface): Promise<AttemptDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.attemptsService.editIrRelevant({
          session,
          id: payload.attemptId,
          userId: payload.userId,
          quizId: payload.quizId,
          irRelevant: true,
        });

        return this.attemptsService.getAttempt({
          session,
          id: payload.attemptId,
          quizId: payload.quizId,
          userId: payload.userId,
          irRelevant: true,
          withResults: true,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

}

mixin(MediaryResultsService, [MongooseSession]);
