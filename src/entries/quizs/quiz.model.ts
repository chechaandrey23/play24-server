import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';
import {Result} from '../results/result.model';
import {Question} from '../questions/question.model';
import {Attempt} from '../attempts/attempt.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Quiz {
	@Prop({type: String, required: true})
	quizname: string;

	@Prop({type: String})
	description: string;

  @Prop({type: Number, ruquired: true})
	duration: number;

	@Prop({type: Number, default: 0})
	numberOfAttempts: number;

	@Prop({type: Boolean, default: false})
	draft: boolean;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
	author: User;

  //@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
	//completedUsers: Array<User>;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]})
	questions: Array<Question>;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}]})
	results: Array<Result>;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attempt'}]})
	attempts: Array<Attempt>;
}

export type QuizDocument = Quiz & Document;
export type QuizModel = Model<QuizDocument>;

export const QuizSchema = SchemaFactory.createForClass(Quiz);
