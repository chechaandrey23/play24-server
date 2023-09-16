import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';
import {Quiz} from '../quizs/quiz.model';
import {Attempt} from '../attempts/attempt.model';
import {Question} from '../questions/question.model';
import {QuestionType} from '../question-types/question.type.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Result {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'})
	quiz: Quiz;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Question'})
	question: Question;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Attempt'})
	attempt: Attempt;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType'})
	questionType: QuestionType;

  @Prop({type: Object, required: true})
  userAnswer: string|Array<string>;

  //@Prop({type: Boolean, default: false})
  //irRelevant: boolean;
}

export type ResultDocument = Result & Document;
export type ResultModel = Model<ResultDocument>;

export const ResultSchema = SchemaFactory.createForClass(Result);
