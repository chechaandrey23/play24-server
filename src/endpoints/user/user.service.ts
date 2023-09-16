import {ConflictException, NotAcceptableException, HttpException, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {ConfigService} from '@nestjs/config';

import {MediaryQuizsService} from '../../mediaries/user/quizs/mediary.quizs.service';

import {Quiz, QuizDocument} from '../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../entries/questions/question.model';
import {Result, ResultDocument} from '../../entries/results/result.model';
import {Attempt, AttemptDocument} from '../../entries/attempts/attempt.model';

import {
  GetQuizsInterface, GetQuizInterface, GetQuizWithAttemptInterface,
  CreateAttemptInterface, GetQuizAllAttemptsInterface,
  GetQuizAllQuestionsInterface,
  GetQuizQuestionInterface, SetQuizQuestionInterface,
  FinishQuizAttemptInterface,
  GetFullQuizInterface,
} from './user.interface';

@Injectable()
export class UserService {
	constructor(
    private configService: ConfigService,
    private mediaryQuizsService: MediaryQuizsService,
	) {}

  public async getQuizs(req: Request, payload: GetQuizsInterface): Promise<Array<QuizDocument>> {
    return await this.mediaryQuizsService.getQuizs({
      userId: payload.userId,
    });
  }

  public async getQuiz(req: Request, payload: GetQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.getQuiz({
      quizId: payload.quizId,
      userId: payload.userId,
    });
  }

  public async getQuizWithAttempt(req: Request, payload: GetQuizWithAttemptInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.getQuiz({
      quizId: payload.quizId,
      userId: payload.userId,
      attemptId: payload.attemptId,
    });
  }

  public async createAttempt(req: Request, payload: CreateAttemptInterface): Promise<AttemptDocument> {
    return await this.mediaryQuizsService.createAttempt({
      userId: payload.userId,
      quizId: payload.quizId,
    });
  }

  public async getQuizAllAttempts(req: Request, payload: GetQuizAllAttemptsInterface): Promise<Array<AttemptDocument>> {
    return await this.mediaryQuizsService.getQuizAllAttempts({
      userId: payload.userId,
      quizId: payload.quizId,
    });
  }

  /*
  public async checkFastIntactQuiz(req: Request, payload: CheckFastIntactQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.checkFastIntactQuiz({
      userId: payload.userId,
      quizId: payload.quizId,
    });
  }
  */
  public async getQuizAllQuestions(req: Request, payload: GetQuizAllQuestionsInterface): Promise<Array<QuestionDocument>> {
    return await this.mediaryQuizsService.getQuizAllQuestions({
      userId: payload.userId,
      quizId: payload.quizId,
      attemptId: payload.attemptId,
    });
  }

  public async getQuizQuestion(req: Request, payload: GetQuizQuestionInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.getQuizQuestion({
      userId: payload.userId,
      quizId: payload.quizId,
      questionId: payload.questionId,
      attemptId: payload.attemptId,
    });
  }

  public async setQuizQuestion(req: Request, payload: SetQuizQuestionInterface): Promise<QuestionDocument> {
    return await this.mediaryQuizsService.setQuizQuestion({
      userId: payload.userId,
      quizId: payload.quizId,
      questionId: payload.questionId,
      attemptId: payload.attemptId,
      answer: payload.answer,
      answerArray: payload.answerArray,
    });
  }

  public async finishQuizAttempt(req: Request, payload: FinishQuizAttemptInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.finishQuizAttempt({
      userId: payload.userId,
      quizId: payload.quizId,
      attemptId: payload.attemptId,
    });
  }

  public async getFullQuiz(req: Request, payload: GetFullQuizInterface): Promise<QuizDocument> {
    return await this.mediaryQuizsService.getFullQuiz({
      quizId: payload.quizId,
      userId: payload.userId,
      attemptId: payload.attemptId,
    });
  }
}
