import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Password {
	@Prop({type: String, required: true})
	hash: string;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	user: User;
}

export type PasswordDocument = Password & Document;
export type PasswordModel = Model<PasswordDocument>;

export const PasswordSchema = SchemaFactory.createForClass(Password);
