import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Question, QuestionDocument, QuestionModel} from './question.model';

import {
  GetQuestionsInterface,
  GetQuestionInterface,
  UpdateResultsPushInterface,
  CountQuestionsInterface, EditOrderInterface, EditOrderNewInterface,
  CreateQuestionInterface, DeleteOneInterface, DeleteManyInterface,
  EditQuestionDraftInterface,
} from './questions.interface';

@Injectable()
export class QuestionsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Question.name, MONGO_FIRST_CONNECT_NAME) private questions: QuestionModel,
	) {}

  public async getQuestions(payload: GetQuestionsInterface): Promise<Array<QuestionDocument>> {
    return await this.questions.find({
      ...(payload.quizId?{quiz: payload.quizId}:{}),
      ...(payload.ids?{_id: {$in: payload.ids}}:{}),
      ...(payload.hasOwnProperty('draft')?{draft: payload.draft}:{}),
    }, {}, {
      session: payload.session,
      skip: payload.offset,
      limit: payload.limit,
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
    });
  }

  public async getQuestion(payload: GetQuestionInterface): Promise<QuestionDocument> {
    return await this.questions.findOne({
      ...(payload.quizId?{quiz: payload.quizId}:{}),
      ...(payload.hasOwnProperty('draft')?{draft: payload.draft}:{}),
      _id: payload.id,
    }, {}, {
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
        ...(payload.withQuiz?[{
					path: 'quiz',
					select: {},
					options: {
            session: payload.session,
            populate: [
              ...(payload.withQuizAttempts?[{
                path: 'attempts',
                select: {},
                ...(payload.quizAttemptsWhere?{match: payload.quizAttemptsWhere}:{}),
                options: {session: payload.session}
              }]:[])
            ],
          }
				}]:[]),
      ]
    });
  }

  public async countQuestions(payload: CountQuestionsInterface): Promise<number> {
    return await this.questions.countDocuments({
      quiz: payload.quizId,
      ...(payload.hasOwnProperty('draft')?{draft: payload.draft}:{}),
    }, {session: payload.session});
  }

  public async createQuestion(payload: CreateQuestionInterface): Promise<QuestionDocument> {
    const [question] = await this.questions.create([{
      quiz: payload.quizId,
      questionType: payload.questionTypeId,
      question: payload.question,
      answerOptions: payload.answerOptions || [],
      answer: payload.answer || undefined,
      order: payload.order,
      draft: payload.draft,
      author: payload.authorId,
    }], {session: payload.session});
		return question;
  }

  public async editQuestionDraft(payload: EditQuestionDraftInterface): Promise<QuestionDocument> {
    await this.questions.updateOne(
			{_id: payload.id},
			{draft: payload.draft},
			{session: payload.session}
		);
    return this.getQuestion({
      id: payload.id,
      session: payload.session
    });
  }

  public async editOrder(payload: EditOrderInterface): Promise<boolean> {
    const res = await this.questions.updateOne(
      {_id: payload.id, quiz: payload.quizId},
			{$set: {order: payload.order}},
			{session: payload.session}
    );
    return res.modifiedCount === 1;
  }

  public async editOrderNew(payload: EditOrderNewInterface): Promise<boolean> {
    const res = await this.questions.updateMany(
      {quiz: payload.quizId},
      [{$addFields: {order: {
        $reduce: {
          input: payload.orderQuestions,
          initialValue: 0,
          in: {
            $cond: {
              if: {$eq: [{$toObjectId: '$$this.id'}, '$_id']},
              then: {$add : ['$$this.order', '$$value']},
              else: {$add : [0, '$$value']},
            }
          }
        }
      } }}],
			{session: payload.session}
    );
    return res.modifiedCount === payload.orderQuestions.length;
  }

  public async updateResultsPush(payload: UpdateResultsPushInterface):Promise<boolean> {
    const res = await this.questions.updateOne(
			{_id: payload.id},
			{$push: {results: payload.resultId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

  public async deleteOne(payload: DeleteOneInterface): Promise<boolean> {
    const res = await this.questions.deleteOne({_id: payload.id}, {session: payload.session});
		return res.deletedCount === 1;
  }

  public async deleteMany(payload:DeleteManyInterface): Promise<boolean> {
    const res = await this.questions.deleteMany({_id: {$in: payload.ids}}, {session: payload.session});
		return res.deletedCount === payload.ids.length;
  }
}
