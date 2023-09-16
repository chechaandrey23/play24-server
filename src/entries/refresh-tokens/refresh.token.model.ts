import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {User} from '../users/user.model';
import {RefreshTokenHash} from '../refresh-token-hashs/refresh.token.hash.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class RefreshToken {
	@Prop({type: String, required: true})
	ip: string;

	@Prop({type: String, required: true})
	userAgent: string;

	@Prop({type: Date, required: true})
	dateEnd: Date;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	user: User;

	@Prop({unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'RefreshTokenHash'})
	refreshTokenHash: RefreshTokenHash;
}

export type RefreshTokenDocument = RefreshToken & Document;
export type RefreshTokenModel = Model<RefreshTokenDocument>;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
