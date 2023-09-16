import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {Result} from '../results/result.model';
import {Quiz} from '../quizs/quiz.model';
import {QuestionType} from '../question-types/question.type.model';
import {User} from '../users/user.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Question {
	@Prop({type: String, required: true})
	question: string;

  @Prop({type: [String]})
  answerOptions: Array<string>;

  @Prop({type: Object})
  answer: string|Array<string>;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'})
	quiz: Quiz;

	@Prop({type: Number})
	order: number;

	@Prop({type: Boolean, default: false})
	draft: boolean;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
	author: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType'})
	questionType: QuestionType;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}]})
	results: Array<Result>;
}

export type QuestionDocument = Question & Document;
export type QuestionModel = Model<QuestionDocument>;

export const QuestionSchema = SchemaFactory.createForClass(Question);
