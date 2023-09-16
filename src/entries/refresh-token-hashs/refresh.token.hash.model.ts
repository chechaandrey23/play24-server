import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {RefreshToken} from '../refresh-tokens/refresh.token.model';

@Schema({timestamps: true, selectPopulatedPaths: false})
export class RefreshTokenHash {
	@Prop({type: String, required: true})
	hash: string;

	@Prop({unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'RefreshToken'})
	refreshToken: RefreshToken;
}

export type RefreshTokenHashDocument = RefreshTokenHash & Document;
export type RefreshTokenHashModel = Model<RefreshTokenHashDocument>;

export const RefreshTokenHashSchema = SchemaFactory.createForClass(RefreshTokenHash);
