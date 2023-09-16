import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class Role {
	@Prop({unique: true, type: Number, required: true})
	role: number;

	@Prop({type: String})
	title: string;

	@Prop({type: String})
	description: string;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
	users: Array<User>;
}

export type RoleDocument = Role & Document;
export type RoleModel = Model<RoleDocument>;

export const RoleSchema = SchemaFactory.createForClass(Role);
