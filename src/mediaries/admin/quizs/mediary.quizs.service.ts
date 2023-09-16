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

import {Quiz, QuizDocument} from '../../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../../entries/questions/question.model';
import {QuestionType, QuestionTypeDocument} from '../../../entries/question-types/question.type.model';
import {Result, ResultDocument} from '../../../entries/results/result.model';
import {User, UserDocument} from '../../../entries/users/user.model';

import {
  QUESTION_RANDOM_ANSWER,
  QUESTION_MATCH_ANSWER,
  QUESTION_MATCH_ANSWER_OPTIONS,
  QUESTION_MULTI_MATCH_ANSWER_OPTIONS,
} from '../../../entries/question-types/question.types';

import {
  GetQuizsInterface, GetFullQuizInterface, GetQuizInterface,
  GetQuizAllQuestionsInterface, GetQuizQuestionInterface,
  CreateQuizInterface, DeleteQuizInterface,
  CreateQuestionInterface, DeleteQuestionInterface,
  OrderQuestionsInterface,
  QuestionTypesInterface,
  EditQuizDraftInterface, EditQuestionDraftInterface,
} from './mediary.quizs.interface';

@Injectable()
export class MediaryQuizsService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) private connection: Connection,
    private configService: ConfigService,
    private usersService: UsersService,
    private quizsService: QuizsService,
    private questionsService: QuestionsService,
    private questionTypesService: QuestionTypesService,
    private resultsService: ResultsService,
	) {}

  public withSession: TypeMethodWithSession;

  public async getQuizs(payload: GetQuizsInterface): Promise<Array<QuizDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('quizs');
        return await this.quizsService.getAllQuizs({
          session,
          limit: config.defaultMaxQuizs,
          offset: 0,
          withAttempts: true,
          attemptsWhere: {
            irRelevant: false,
          },
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getQuiz(payload: GetQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          withAttempts: true,
          attemptsWhere: {
            irRelevant: false,
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
        return await this.quizsService.getQuiz({
          session,
          id: payload.quizId,
          withQuestions: true,
          withQuestionType: true,
          withAttempts: true,
          attemptsWhere: {
            irRelevant: false,
          },
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async createQuiz(payload: CreateQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const quiz: QuizDocument = await this.quizsService.createQuiz({
          session,
          quizname: payload.quizname,
          draft: payload.draft,
          authorId: payload.authorId,
          description: payload.description,
          duration: payload.duration,
          numberOfAttempts: payload.numberOfAttempts,
        });
        return await this.quizsService.getQuiz({
          session,
          id: quiz.id,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async deleteQuiz(payload: DeleteQuizInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const quiz: QuizDocument = await this.quizsService.getQuiz({
          session,
          id: payload.id,
          withQuestions: true,
        });

        if(!quiz) {
          throw new ConflictException(`Quiz with quizId "${payload.id}" - NOT FOUND`);
        }

        if(quiz.author as any != payload.authorId) {
          throw new ConflictException(`You cannot delete the quiz '${payload.authorId}', because you are not the author and creator`);
        }

        if(payload.deleteWithQuestions) {
          await this.questionsService.deleteMany({
            session,
            ids: (quiz.questions as Array<QuestionDocument>).map((entry: QuestionDocument): string => entry.id),
          });

          await this.questionTypesService.updateAllManyQuestionsPull({
            session,
            questionIds: (quiz.questions as Array<QuestionDocument>).map((entry: QuestionDocument): string => entry.id),
          });
        }

        await this.quizsService.deleteOne({
          session,
          id: payload.id,
        });

        await this.usersService.updateAllCompletedQuizsPull({
          session,
          quizId: payload.id,
        });

        return quiz;
      });
    } catch(e) {
      handlerError(e, {id: payload.id});
    }
  }

  public async editQuizDraft(payload: EditQuizDraftInterface): Promise<QuizDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.quizsService.editQuizDraft({
          session,
          id: payload.id,
          draft: payload.draft,
        });
      });
    } catch(e) {
      handlerError(e, {id: payload.id});
    }
  }

  public async getQuizAllQuestions(payload: GetQuizAllQuestionsInterface): Promise<Array<QuestionDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('questions');
        return await this.questionsService.getQuestions({
          session,
          limit: config.defaultMaxQuestions,
          offset: 0,
          quizId: payload.quizId,
          withQuestionType: true,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getQuizQuestion(payload: GetQuizQuestionInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.questionsService.getQuestion({
          session,
          id: payload.questionId,
          quizId: payload.quizId,
          withQuestionType: true,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async createQuestion(payload: CreateQuestionInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const questionType: QuestionTypeDocument = await this.questionTypesService.getQuestionType({
          id: payload.questionTypeId,
          session,
        });

        const countQuestions: number = await this.questionsService.countQuestions({
          session,
          quizId: payload.quizId,
        });

        const question: QuestionDocument = await this.questionsService.createQuestion({
          session,
          quizId: payload.quizId,
          questionTypeId: payload.questionTypeId,
          question: payload.question,
          ...((questionType.type===QUESTION_MATCH_ANSWER_OPTIONS || questionType.type===QUESTION_MULTI_MATCH_ANSWER_OPTIONS)?{answerOptions: payload.answerOptions}:{}),
          ...((questionType.type===QUESTION_MULTI_MATCH_ANSWER_OPTIONS)?{answer: payload.answerArray}:{}),
          ...((questionType.type===QUESTION_MATCH_ANSWER || questionType.type===QUESTION_MATCH_ANSWER_OPTIONS)?{answer: payload.answer}:{}),
          order: countQuestions + 1,
          draft: payload.draft,
          authorId: payload.authorId,
        });

        // check answer & answerArray in answerOptions !!!!!!!!!!!!!!!!!!!!!!!!!

        await this.questionTypesService.updateQuestionsPush({
          session,
          id: payload.questionTypeId,
          questionId: question.id,
        });

        await this.quizsService.updateQuestionsPush({
          session,
          questionId: question.id,
          id: payload.quizId,
        });

        return await this.questionsService.getQuestion({
          session,
          id: question.id,
          quizId: payload.quizId,
          withQuestionType: true,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async editQuestionDraft(payload: EditQuestionDraftInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.questionsService.editQuestionDraft({
          session,
          id: payload.id,
          draft: payload.draft,
        });
      });
    } catch(e) {
      handlerError(e, {id: payload.id});
    }
  }

  public async deleteQuestion(payload: DeleteQuestionInterface): Promise<QuestionDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const question: QuestionDocument = await this.questionsService.getQuestion({
          session,
          id: payload.id,
          withQuestionType: true,
        });

        if(!question) {
          throw new ConflictException(`Question with questionId "${payload.id}" - NOT FOUND`);
        }

        if(question.author as any != payload.authorId) {
          throw new ConflictException(`You cannot delete the question '${payload.authorId}', because you are not the author and creator`);
        }

        await this.questionsService.deleteOne({
          session,
          id: payload.id,
        });

        await this.questionTypesService.updateQuestionsPull({
          session,
          id: (question.questionType as QuestionTypeDocument).id,
          questionId: payload.id,
        });

        await this.quizsService.updateQuestionsPull({
          session,
          //id: (question.quiz as QuizDocument).id,
          id: question.quiz as any,
          questionId: payload.id,
        });

        return question;
      });
    } catch(e) {
      handlerError(e, {id: payload.id});
    }
  }

  public async orderQuestions(payload: OrderQuestionsInterface): Promise<Array<QuestionDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        /*
        await payload.orderQuestions.forEach(async (item) => {
          // withOut cicle!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          await this.questionsService.editOrder({
            session,
            id: item.id,
            quizId: payload.quizId,
            order: item.order,
          });
        });
        */
        await this.questionsService.editOrderNew({
          session,
          quizId: payload.quizId,
          orderQuestions: payload.orderQuestions,
        });


        return await this.questionsService.getQuestions({
          session,
          withQuestionType: true,
          ids: payload.orderQuestions.map((item) => item.id),
          quizId: payload.quizId,
          limit: payload.orderQuestions.length,
          offset: 0,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async getAllQuestionTypes(payload: QuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('question-types');
        return await this.questionTypesService.getAllQuestionTypes({
          session,
          offset: 0,
          limit: config.defaultMaxQuestionTypes,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

}

mixin(MediaryQuizsService, [MongooseSession]);
