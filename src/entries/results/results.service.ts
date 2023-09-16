import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Result, ResultDocument, ResultModel} from './result.model';

import {
  GetQuestionsForUserInterface, GetAllResultsInterface, GetResultInterface,
  SetAnswerInterface, EditManyIrRelevantInterface,
  GetResultOneInterface, EditUserAnswerInterface,
} from './results.interface';

@Injectable()
export class ResultsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Result.name, MONGO_FIRST_CONNECT_NAME) private results: ResultModel,
	) {}

  public async getQuestionsForUser(payload: GetQuestionsForUserInterface): Promise<Array<ResultDocument>> {
    return await this.results.find({
      user: payload.userId,
      quiz: payload.quizId,
      question: {$in: payload.questionIds},
      //irRelevant: false,
    }, {}, {
      session: payload.session,
    });
  }

  public async getResult(payload: GetResultInterface): Promise<Array<ResultDocument>> {
    return await this.results.find({
      user: payload.userId,
      quiz: payload.quizId,
      //irRelevant: payload.irRelevant,
		}, {}, {
			session: payload.session,
      limit: payload.limit,
      offset: payload.offset,
		});
  }

  public async getAllResults(payload: GetAllResultsInterface): Promise<Array<ResultDocument>> {
    return await this.results.find({
      ...(payload.userId?{user: payload.userId}:{}),
      quiz: payload.quizId,
      //irRelevant: payload.irRelevant,
    }, {}, {
      session: payload.session,
      limit: payload.limit,
      offset: payload.offset,
    });
  }

  public async setAnswer(payload: SetAnswerInterface): Promise<ResultDocument> {
    const [result] = await this.results.create([{
			user: payload.userId,
      quiz: payload.quizId,
      question: payload.questionId,
      questionType: payload.questionTypeId,
      attempt: payload.attemptId,
      userAnswer: payload.answer,
      //irRelevant: false,
		}], {session: payload.session});
		return result;
  }

  public async getResultOne(payload: GetResultOneInterface): Promise<ResultDocument> {
    return await this.results.findOne({
      user: payload.userId,
      quiz: payload.quizId,
      question: payload.questionId,
      questionType: payload.questionTypeId,
      attempt: payload.attemptId,
    }, {}, {
      session: payload.session,
    });
  }

  public async editUserAnswer(payload: EditUserAnswerInterface): Promise<boolean> {
    const res = await this.results.updateOne(
			{_id: payload.id},
			{userAnswer: payload.answer},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }
  /*
  public async editManyIrRelevant(payload: EditManyIrRelevantInterface): Promise<boolean> {
    const count: number = await this.results.countDocuments(
      {user: payload.userId, quiz: payload.quizId, irRelevant: !payload.irRelevant},
      {session: payload.session}
    );
    const res = await this.results.updateMany(
      {user: payload.userId, quiz: payload.quizId,},
			{$set: {irRelevant: payload.irRelevant}},
			{session: payload.session}
    );
    return res.modifiedCount === count;
  }
  */
}
