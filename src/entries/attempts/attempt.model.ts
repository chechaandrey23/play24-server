import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';
import {Quiz} from '../quizs/quiz.model';
import {Result} from '../results/result.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Attempt {
  @Prop({type: Date, required: true})
	dateStart: Date;

  @Prop({type: Date})
	dateEnd: Date;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'})
	quiz: Quiz;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}]})
	results: Array<Result>;

  @Prop({type: Boolean, default: false})
  irRelevant: boolean;
}

export type AttemptDocument = Attempt & Document;
export type AttemptModel = Model<AttemptDocument>;

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
