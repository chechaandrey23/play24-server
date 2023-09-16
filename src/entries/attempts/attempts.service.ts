import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Attempt, AttemptDocument, AttemptSchema, AttemptModel} from './attempt.model';

import {
  CreateAttemptInterface,
  GetAllAttemptsInterface, GetAttemptInterface,
  UpdateResultsPushInterface,
  EditDateEndInterface, EditIrRelevantInterface,
} from './attempts.interface';

@Injectable()
export class AttemptsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Attempt.name, MONGO_FIRST_CONNECT_NAME) private attempts: AttemptModel,
	) {}

  public async createAttempt(payload: CreateAttemptInterface): Promise<AttemptDocument> {
    const [attempt] = await this.attempts.create([{
      quiz: payload.quizId,
      user: payload.userId,
      dateStart: payload.dateStart,
      irRelevant: payload.irRelevant,
		}], {session: payload.session});
		return attempt;
  }

  public async getAllAttempts(payload: GetAllAttemptsInterface): Promise<Array<AttemptDocument>> {
    return await this.attempts.find({
      ...(payload.userId?{user: payload.userId}:{}),
      quiz: payload.quizId,
      irRelevant: payload.irRelevant,
    }, {}, {
      session: payload.session,
      skip: payload.offset,
      limit: payload.limit,
      populate: [
        ...(payload.withQuiz?[{
					path: 'quiz',
					select: {},
					options: {session: payload.session}
				}]:[]),
        ...(payload.withUser?[{
					path: 'user',
					select: {},
					options: {session: payload.session}
				}]:[]),
        ...(payload.withResults?[{
          path: 'results',
          select: {},
          options: {session: payload.session}
        }]:[])
      ],
    });
  }

  public async getAttempt(payload: GetAttemptInterface): Promise<AttemptDocument> {
    return await this.attempts.findOne({
      _id: payload.id,
      user: payload.userId,
      quiz: payload.quizId,
      irRelevant: payload.irRelevant || false,
    }, {}, {
      session: payload.session,
      populate: [
        ...(payload.withQuiz?[{
          path: 'quiz',
          select: {},
          options: {session: payload.session}
        }]:[]),
        ...(payload.withResults?[{
          path: 'results',
          select: {},
          options: {session: payload.session}
        }]:[])
      ],
    });
  }

  public async updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean> {
    const res = await this.attempts.updateOne(
			{_id: payload.id},
			{$push: {results: payload.resultId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async editDateEnd(payload: EditDateEndInterface): Promise<AttemptDocument> {
    await this.attempts.updateOne(
			{_id: payload.id, user: payload.userId, quiz: payload.quizId},
			{dateEnd: payload.dateEnd},
			{session: payload.session}
		);
    return this.getAttempt({
      id: payload.id,
      userId: payload.userId,
      quizId: payload.quizId,
      session: payload.session,
    });
  }

  public async editIrRelevant(payload: EditIrRelevantInterface): Promise<AttemptDocument> {
    await this.attempts.updateOne(
			{_id: payload.id, user: payload.userId, quiz: payload.quizId},
			{irRelevant: payload.irRelevant},
			{session: payload.session}
		);
    return this.getAttempt({
      id: payload.id,
      userId: payload.userId,
      quizId: payload.quizId,
      session: payload.session,
    });
  }
}
