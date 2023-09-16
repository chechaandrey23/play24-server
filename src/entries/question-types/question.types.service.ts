import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {QuestionType, QuestionTypeDocument, QuestionTypeModel} from './question.type.model';

import {
  GetQuestionTypeInterafce, GetAllQuestionTypesInterface,
  BulkCreateQuestionTypesInterface, CheckDublicateQuestionTypesInterface,
  UpdateResultsPushInterface,
  UpdateQuestionsPushInterface, UpdateQuestionsPullInterface, UpdateAllManyQuestionsPullInterface,
} from './question.types.interface';

import DublicateQuestionTypeException from '../../utils/dublicate.question.type.exception';

@Injectable()
export class QuestionTypesService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(QuestionType.name, MONGO_FIRST_CONNECT_NAME) private questionTypes: QuestionTypeModel,
	) {}

  public async getQuestionType(payload: GetQuestionTypeInterafce): Promise<QuestionTypeDocument> {
    return await this.questionTypes.findOne({
      _id: payload.id,
    }, {}, {
      session: payload.session,
    });
  }

  public async getAllQuestionTypes(payload: GetAllQuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    return await this.questionTypes.find({
      ...(payload.ids?{_id: {$in: payload.ids}}:{}),
      ...(payload.types?{type: {$in: payload.types}}:{})
    }, {}, {
      session: payload.session,
      skip: payload.offset,
      limit: payload.limit,
    });
  }

  public async bulKCreateQuestionTypes(payload: BulkCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    await this.checkDublicateQuestionTypes({types: payload.questionTypes.map((item) => item.type)});
    return await this.questionTypes.create(payload.questionTypes, {session: payload.session});
  }

  public async checkDublicateQuestionTypes(payload: CheckDublicateQuestionTypesInterface): Promise<boolean> {
    const res = await this.questionTypes.find({
			type: {$in: payload.types}
		}, null, {
			session: payload.session,
		});
		if(res.length > 0) {
			throw new DublicateQuestionTypeException(`QuestionType with type "${res[0].type}" already exists`);
		}
		return true;
  }

  public async updateResultsPush(payload: UpdateResultsPushInterface):Promise<boolean> {
    const res = await this.questionTypes.updateOne(
			{_id: payload.id},
			{$push: {results: payload.resultId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateQuestionsPush(payload: UpdateQuestionsPushInterface): Promise<boolean> {
    const res = await this.questionTypes.updateOne(
			{_id: payload.id},
			{$push: {questions: payload.questionId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateQuestionsPull(payload: UpdateQuestionsPullInterface): Promise<boolean> {
    const res = await this.questionTypes.updateOne(
			{_id: payload.id},
			{$pullAll: {questions: [payload.questionId]}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async updateAllManyQuestionsPull(payload: UpdateAllManyQuestionsPullInterface): Promise<boolean> {
    const res = await this.questionTypes.updateMany(
			{questions: {$all: payload.questionIds}},
			{$pullAll: {questions: payload.questionIds}},
			{session: payload.session}
		);
		return res.modifiedCount === payload.questionIds.length;
  }

}
