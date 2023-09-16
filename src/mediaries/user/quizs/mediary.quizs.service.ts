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
import {QuestionsService} from '../../../entries/questions/questions.service';
import {QuestionTypesService} from '../../../entries/question-types/question.types.service';
import {ResultsService} from '../../../entries/results/results.service';
import {UsersService} from '../../../entries/users/users.service';
import {AttemptsService} from '../../../entries/attempts/attempts.service';

import {Quiz, QuizDocument} from '../../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../../entries/questions/question.model';
import {QuestionType, QuestionTypeDocument} from '../../../entries/question-types/question.type.model';
import {Result, ResultDocument} from '../../../entries/results/result.model';
import {User, UserDocument} from '../../../entries/users/user.model';
import {Attempt, AttemptDocument} from '../../../entries/attempts/attempt.model';

import {
  QUESTION_RANDOM_ANSWER,
  QUESTION_MATCH_ANSWER,
  QUESTION_MATCH_ANSWER_OPTIONS,
  QUESTION_MULTI_MATCH_ANSWER_OPTIONS,
} from '../../../entries/question-types/question.types';

import {
  GetQuizsInterface, GetQuizInterface,
  CreateAttemptInterface, GetQuizAllAttemptsInterface,
  GetQuizAllQuestionsInterface,
  GetQuizQuestionInterface, SetQuizQuestionInterface,
  FinishQuizAttemptInterface,
  CheckExpiredAttemptInterface,
  GetFullQuizInterface,
} from './mediary.quizs.interface';

@Injectable()
export class MediaryQuizsService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
    private configService: ConfigService,
    private usersService: UsersService,
    private quizsService: QuizsService,
    private questionsService: QuestionsService,
    private questionTypesService: QuestionTypesService,
    private resultsService: ResultsService,
    private attemptsService: AttemptsService,
	) {}

  public withSession: TypeMethodWithSession;

  public async getQuizs(payload: GetQuizsInterface): Promise<Array<QuizDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('quizs');
        return await this.quizsService.getAllQuizs({
          session,
          withAttempts: true,
          attemptsWhere: {
            user: payload.userId,
            irRelevant: false,
          },
          draft: false,
          limit: config.defaultMaxQuizs,
          offset: 0,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getQuiz(payload: GetQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const quiz: QuizDocument = await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          //draft: false,
          withAttempts: true,
          attemptsWhere: {
            ...(payload.attemptId?{_id: payload.attemptId}:{}),
            user: payload.userId,
            irRelevant: false,
          },
        });

        if(quiz.draft == true) {
          throw new ConflictException(`You can't take an unpublished quiz (QuizId: ${payload.quizId})!!!`);
        }

        return quiz;
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async createAttempt(payload: CreateAttemptInterface): Promise<AttemptDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        // get quiz
        const quiz: QuizDocument = await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          withAttempts: true,
          attemptsWhere: {
            user: payload.userId,
            irRelevant: false,
          },
          draft: false,
        });

        const numberOfAttempts = (quiz.attempts as Array<AttemptDocument>).length;

        if(quiz.numberOfAttempts == 0 || (quiz.numberOfAttempts != 0 && (quiz.numberOfAttempts as number) > numberOfAttempts)) {
          const attempt: AttemptDocument = await this.attemptsService.createAttempt({
            quizId: payload.quizId,
            userId: payload.userId,
            dateStart: new Date(),
            irRelevant: false,
          });

          // patch quizs
          await this.quizsService.updateAttemptsPush({
            session,
            id: payload.quizId,
            attemptId: attempt.id,
          });
          // patch users
          await this.usersService.updateAttemptsPush({
            session,
            id: payload.userId,
            attemptId: attempt.id,
          });

          return attempt;
        } else {
          throw new ConflictException(`The number of attempts to pass the quiz exceeds the allowed value "${numberOfAttempts}"`);
        }
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getQuizAllAttempts(payload: GetQuizAllAttemptsInterface): Promise<Array<AttemptDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('attempts');
        return await this.attemptsService.getAllAttempts({
          session,
          quizId: payload.quizId,
          userId: payload.userId,
          limit: config.defaultMaxAttempts,
          offset: 0,
          irRelevant: false,
          withQuiz: true,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  protected async checkExpiredAttempt(payload: CheckExpiredAttemptInterface): Promise<AttemptDocument> {
    const attempt: AttemptDocument = await this.attemptsService.getAttempt({
      session: payload.session,
      id: payload.attemptId,
      userId: payload.userId,
      quizId: payload.quizId,
      withQuiz: true,
    });

    if(!attempt) {
      throw new ConflictException(`attempt attemptId (${payload.attemptId}) is missing or not available for user userId (${payload.userId})`);
    }

    const quiz: QuizDocument = attempt.quiz as QuizDocument;

    if(attempt.irRelevant) {
      throw new ConflictException(`You can't pass the quiz (${payload.userId}) on an irrelevant attempt (${payload.attemptId})`);
    } else if(quiz.draft == true) {
      throw new ConflictException(`You can't take an unpublished quiz quizID: ${payload.quizId}`);
    } else if(attempt.dateEnd && Date.now() <= new Date(attempt.dateEnd).getTime()) {
      throw new ConflictException(`You cannot pass a quiz that has already been completed quizID: ${payload.quizId}; attemptId: ${payload.attemptId}`);
    } else if(quiz.duration != 0 && new Date(attempt.dateStart).getTime() + (quiz.duration as number) < Date.now()) {
      throw new ConflictException(`Time expired for the current quiz quizID: ${payload.quizId}`);
    }

    return attempt;
  }

  public async getQuizAllQuestions(payload: GetQuizAllQuestionsInterface): Promise<Array<QuestionDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.checkExpiredAttempt({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
        });
        const config = this.configService.get('questions');
        return await this.questionsService.getQuestions({
          session,
          limit: config.defaultMaxQuestions,
          offset: 0,
          quizId: payload.quizId,
          //withQuestionType: true,
          withResults: true,
          resultsWhere: {
            user: payload.userId, quiz: payload.quizId /* $expr: {$eq: ['$$ROOT.id', '$id']} ??????????? */, attempt: payload.attemptId
          }
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getQuizQuestion(payload: GetQuizQuestionInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.checkExpiredAttempt({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
        });
        return await this.questionsService.getQuestion({
          session,
          id: payload.questionId,
          quizId: payload.quizId,
          withQuestionType: true,
          withQuiz: true,
          withResults: true,
          resultsWhere: {
            user: payload.userId, quiz: payload.quizId, question: payload.questionId, attempt: payload.attemptId
          },
          withQuizAttempts: true,
          quizAttemptsWhere: {
            _id: payload.attemptId,
          },
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async setQuizQuestion(payload: SetQuizQuestionInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.checkExpiredAttempt({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
        });

        const question: QuestionDocument = await this.questionsService.getQuestion({
          session,
          id: payload.questionId,
          quizId: payload.quizId,
          withQuestionType: true,
        });

        const questionType = (question.questionType as QuestionTypeDocument).type;

        let answer = null;

        if(questionType === QUESTION_RANDOM_ANSWER || questionType === QUESTION_MATCH_ANSWER || questionType === QUESTION_MATCH_ANSWER_OPTIONS) {
          answer = payload.answer;
        } else if(questionType === QUESTION_MULTI_MATCH_ANSWER_OPTIONS) {
          answer = payload.answerArray;
        } else {
          throw new ConflictException(`Question with questionId "${payload.questionId}" with questionType "${questionType}" - NOT FOUND!`);
        }

        const res: ResultDocument = await this.resultsService.getResultOne({
          session,
          userId: payload.userId,
          questionId: payload.questionId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
          questionTypeId: (question.questionType as QuestionTypeDocument).id,
        });

        if(!res) {
          const result: ResultDocument = await this.resultsService.setAnswer({
            session,
            userId: payload.userId,
            questionId: payload.questionId,
            quizId: payload.quizId,
            attemptId: payload.attemptId,
            questionTypeId: (question.questionType as QuestionTypeDocument).id,
            answer: answer,
          });

          // write resultId in Users
          await this.usersService.updateResultsPush({
            session,
            id: payload.userId,
            resultId: result.id,
          });
          // write resultId in Quizs
          await this.quizsService.updateResultsPush({
            session,
            id: payload.quizId,
            resultId: result.id,
          });
          // write resultId in Attempts
          await this.attemptsService.updateResultsPush({
            session,
            id: payload.attemptId,
            resultId: result.id,
          });
          // write resultId in Questions
          await this.questionsService.updateResultsPush({
            session,
            id: payload.questionId,
            resultId: result.id,
          });
          // write resultId in QuestionTypes
          await this.questionTypesService.updateResultsPush({
            session,
            id: (question.questionType as QuestionTypeDocument).id,
            resultId: result.id,
          });
        } else {
          await this.resultsService.editUserAnswer({
            session,
            id: res.id,
            answer: answer,
          });
        }

        return await this.questionsService.getQuestion({
          session,
          id: payload.questionId,
          quizId: payload.quizId,
          withQuestionType: true,
          withResults: true,
          resultsWhere: {user: payload.userId, quiz: payload.quizId, question: payload.questionId, attempt: payload.attemptId}
        })
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async finishQuizAttempt(payload: FinishQuizAttemptInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.checkExpiredAttempt({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
        });

        await this.attemptsService.editDateEnd({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          id: payload.attemptId,
          dateEnd: new Date(Date.now()),
        });
        /*
        await this.quizsService.updateCompletedUsersPush({
          session,
          id: payload.quizId,
          userId: payload.userId,
        });

        await this.usersService.updateCompletedQuizsPush({
          session,
          id: payload.userId,
          quizId: payload.quizId,
        });
        */

        return await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          withAttempts: true,
          attemptsWhere: {
            user: payload.userId,
            attempt: payload.attemptId,
          },
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getFullQuiz(payload: GetFullQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        await this.checkExpiredAttempt({
          session,
          userId: payload.userId,
          quizId: payload.quizId,
          attemptId: payload.attemptId,
        });

        return await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          draft: false,
          withAttempts: true,
          attemptsWhere: {
            ...(payload.attemptId?{_id: payload.attemptId}:{}),
            user: payload.userId,
            quiz: payload.quizId,
            irRelevant: false,
          },
          withQuestions: true,
          questionsWhere: {draft: false},
          withQuestionType: true,
          withResults: true,
          resultsWhere: {
            user: payload.userId, quiz: payload.quizId /* $expr: {$eq: ['$$ROOT.id', '$id']} ??????????? */, attempt: payload.attemptId
          },
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

}

mixin(MediaryQuizsService, [MongooseSession]);
