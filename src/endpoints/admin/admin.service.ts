import {ConflictException, NotAcceptableException, HttpException, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {ConfigService} from '@nestjs/config';

import {MediaryQuizsService as MediaryUserQuizsService} from '../../mediaries/user/quizs/mediary.quizs.service';

import {MediaryQuizsService} from '../../mediaries/admin/quizs/mediary.quizs.service';
import {MediaryResultsService} from '../../mediaries/admin/results/mediary.results.service';

import {Quiz, QuizDocument} from '../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../entries/questions/question.model';
import {Result, ResultDocument} from '../../entries/results/result.model';
import {QuestionType, QuestionTypeDocument} from '../../entries/question-types/question.type.model';
import {Attempt, AttemptDocument} from '../../entries/attempts/attempt.model';

import {
  GetQuizInterface,
  GetAllQuizsInterface, GetFullQuizInterface, GetAllQuestionTypesInterface,
  GetResultsForQuizInterface,
  ResetResultQuizInterface,
  GetQuizAllQuestionsInterface, GetQuizQuestionInterface,
  CreateQuizInterface, DeleteQuizInterface,
  CreateQuestionInterface, DeleteQuestionInterface,
  OrderQuestionsInterface,
  EditQuizDraftInterface, EditQuestionDraftInterface,
} from './admin.interface';

@Injectable()
export class AdminService {
	constructor(
    private configService: ConfigService,
    private mediaryUserQuizsService: MediaryUserQuizsService,
    private mediaryQuizsService: MediaryQuizsService,
    private mediaryResultsService: MediaryResultsService,
	) {}

  public async getAllQuizs(req: Request, payload: GetAllQuizsInterface): Promise<Array<QuizDocument>> {
    //return await this.mediaryUserQuizsService.getQuizs({});
    return await this.mediaryQuizsService.getQuizs({});
  }

  public async getQuiz(req: Request, payload: GetQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.getQuiz({
      quizId: payload.quizId,
    });
  }

  public async getResultsForQuiz(req: Request, payload: GetResultsForQuizInterface): Promise<QuizDocument> {
    return await this.mediaryResultsService.getResultsForQuiz({
      quizId: payload.quizId,
    });
  }

  public async resetResultQuiz(req: Request, payload: ResetResultQuizInterface): Promise<AttemptDocument> {
    return await this.mediaryResultsService.resetResultQuiz({
      quizId: payload.quizId,
      userId: payload.userId,
      attemptId: payload.attemptId,
    });
  }

  public async getQuizAllQuestions(req: Request, payload: GetQuizAllQuestionsInterface): Promise<Array<QuestionDocument>> {
    return await this.mediaryQuizsService.getQuizAllQuestions({
      quizId: payload.quizId,
    });
  }

  public async getFullQuiz(req: Request, payload: GetFullQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.getFullQuiz({
      quizId: payload.quizId,
    });
  }

  public async getQuizQuestion(req: Request, payload: GetQuizQuestionInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.getQuizQuestion({
      quizId: payload.quizId,
      questionId: payload.questionId,
    });
  }

  public async createQuiz(req: Request, payload: CreateQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.createQuiz({
      quizname: payload.quizname,
      draft: payload.draft,
      authorId: payload.authorId,
      description: payload.description,
      duration: payload.duration,
      numberOfAttempts: payload.numberOfAttempts,
    });
  }

  public async deleteQuiz(req: Request, payload: DeleteQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.deleteQuiz({
      id: payload.id,
      deleteWithQuestions: true,
      authorId: payload.authorId,
    });
  }

  public async editQuizDraft(req: Request, payload: EditQuizDraftInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.editQuizDraft({
      id: payload.id,
      draft: payload.draft,
    });
  }

  public async createQuestion(req: Request, payload: CreateQuestionInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.createQuestion({
      quizId: payload.quizId,
      questionTypeId: payload.questionTypeId,
      question: payload.question,
      answerOptions: payload.answerOptions,
      answer: payload.answer,
      answerArray: payload.answerArray,
      draft: payload.draft,
      authorId: payload.authorId,
    });
  }

  public async editQuestionDraft(req: Request, payload: EditQuestionDraftInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.editQuestionDraft({
      id: payload.id,
      draft: payload.draft,
    });
  }

  public async deleteQuestion(req: Request, payload: DeleteQuestionInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.deleteQuestion({
      id: payload.id,
      authorId: payload.authorId,
    });
  }

  public async orderQuestions(req: Request, payload: OrderQuestionsInterface): Promise<Array<QuestionDocument>> {
    return await this.mediaryQuizsService.orderQuestions({
      quizId: payload.quizId,
      orderQuestions: payload.orderQuestions,
    });
  }

  public async getAllQuestionTypes(req: Request, payload: GetAllQuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    return await this.mediaryQuizsService.getAllQuestionTypes({});
  }
}
