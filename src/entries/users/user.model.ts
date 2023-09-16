import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {Role} from '../roles/role.model';
import {Password} from '../passwords/password.model';
import {RefreshToken} from '../refresh-tokens/refresh.token.model';
import {Result} from '../results/result.model';
import {Quiz} from '../quizs/quiz.model';
import {Attempt} from '../attempts/attempt.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class User {
	@Prop({unique: true, type: String, required: true})
	username: string;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]})
	roles: Array<Role>;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Password'})
	password: Password;

	//@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}]})
	//completedQuizs: Array<Quiz>;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'RefreshToken'}]})
	refreshTokens: Array<RefreshToken>;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}]})
	results: Array<Result>;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attempt'}]})
	attempts: Array<Attempt>;
}

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
