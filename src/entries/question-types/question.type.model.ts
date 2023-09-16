import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {Result} from '../results/result.model';
import {Question} from '../questions/question.model';

import {
  QUESTION_RANDOM_ANSWER,
  QUESTION_MATCH_ANSWER,
  QUESTION_MATCH_ANSWER_OPTIONS,
  QUESTION_MULTI_MATCH_ANSWER_OPTIONS
} from './question.types';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class QuestionType {
  @Prop({type: Number, required: true})
  type: number;

  @Prop({type: String})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]})
	questions: Array<Question>;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}]})
	results: Array<Result>;
}

export type QuestionTypeDocument = QuestionType & Document;
export type QuestionTypeModel = Model<QuestionTypeDocument>;

export const QuestionTypeSchema = SchemaFactory.createForClass(QuestionType);
