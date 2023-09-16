import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Quiz, QuizDocument, QuizModel} from './quiz.model';
import {Question, QuestionDocument, QuestionModel} from '../questions/question.model';

import {
  GetAllQuizsInterface,
  GetQuizInterface,
  UpdateResultsPushInterface, UpdateAttemptsPushInterface,
  UpdateCompletedUsersPushInterace, UpdateCompletedUsersPullInterface,
  CreateQuizInterface, DeleteOneInterface,
  EditQuizDraftInterface,
  UpdateQuestionsPushInterface, UpdateQuestionsPullInterface,
} from './quizs.interface';

@Injectable()
export class QuizsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Quiz.name, MONGO_FIRST_CONNECT_NAME) private quizs: QuizModel,
    @InjectModel(Question.name, MONGO_FIRST_CONNECT_NAME) private questions: QuestionModel,
	) {}

  public async getAllQuizs(payload: GetAllQuizsInterface): Promise<Array<QuizDocument>> {
    return await this.quizs.find({
      ...(payload.hasOwnProperty('draft')?{draft: payload.draft}:{}),
    }, {}, {
      session: payload.session,
      skip: payload.offset,
      limit: payload.limit,
      populate: [
        ...(payload.withAttempts?[{
          path: 'attempts',
          select: {},
          ...(payload.attemptsWhere?{match: payload.attemptsWhere}:{}),
          options: {session: payload.session}
        }]:[])
      ]
    });
  }

  public async getQuiz(payload: GetQuizInterface): Promise<QuizDocument> {
    return await this.quizs.findOne({
      _id: payload.id,
      ...(payload.hasOwnProperty('draft')?{draft: payload.draft}:{}),
      ...(payload.where?payload.where:{}),
    }, {}, {
      session: payload.session,
      populate: [
        ...(payload.withQuestions?[{
            path: 'questions',
            select: {},
            ...(payload.questionsWhere?{match: payload.questionsWhere}:{}),
            options: {
              session: payload.session,
              populate: [
                ...(payload.withQuestionType?[{
                  path: 'questionType',
                  select: {},
                  options: {session: payload.session}
                }]:[]),
                ...(payload.withResults?[{
                  path: 'results',
                  select: {},
                  ...(payload.resultsWhere?{match: payload.resultsWhere}:{}),
                  options: {session: payload.session},
                }]:[]),
              ]
            }
          }]:[]),
        ...(payload.withAttempts?[{
          path: 'attempts',
          select: {},
          ...(payload.attemptsWhere?{match: payload.attemptsWhere}:{}),
          options: {
            session: payload.session,
            populate: [
              ...(payload.withAttemptUser?[{
                path: 'user',
                select: {},
                options: {session: payload.session}
              }]:[]),
              ...(payload.withAttemptResults?[{
                path: 'results',
                select: {},
                ...(payload.attemptResultsWhere?{match: payload.attemptResultsWhere}:{}),
                options: {session: payload.session}
              }]:[]),
            ],
          }
        }]:[])
      ],
    });
  }

  public async createQuiz(payload: CreateQuizInterface): Promise<QuizDocument> {
    const [quiz] = await this.quizs.create([{
			quizname: payload.quizname,
      draft: payload.draft,
      author: payload.authorId,
      description: payload.description,
      duration: payload.duration,
      numberOfAttempts: payload.numberOfAttempts,
		}], {session: payload.session});
		return quiz;
  }

  public async editQuizDraft(payload: EditQuizDraftInterface): Promise<QuizDocument> {
    await this.quizs.updateOne(
			{_id: payload.id},
			{draft: payload.draft},
			{session: payload.session}
		);
    return this.getQuiz({
      id: payload.id,
      session: payload.session
    })
  }

  public async updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$push: {results: payload.resultId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateAttemptsPush(payload: UpdateAttemptsPushInterface): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$push: {attempts: payload.attemptId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateCompletedUsersPush(payload: UpdateCompletedUsersPushInterace): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$push: {completedUsers: payload.userId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateCompletedUsersPull(payload: UpdateCompletedUsersPullInterface): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$pullAll: {completedUsers: [payload.userId]}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateQuestionsPush(payload: UpdateQuestionsPushInterface): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$push: {questions: payload.questionId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateQuestionsPull(payload: UpdateQuestionsPullInterface): Promise<boolean> {
    const res = await this.quizs.updateOne(
			{_id: payload.id},
			{$pullAll: {questions: [payload.questionId]}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async deleteOne(payload: DeleteOneInterface): Promise<boolean> {
    const res = await this.quizs.deleteOne({_id: payload.id}, {session: payload.session});
		return res.deletedCount === 1;
  }
}
