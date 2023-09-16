import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { RefreshToken } from '../refresh-tokens/refresh.token.model';
export declare class RefreshTokenHash {
    hash: string;
    refreshToken: RefreshToken;
}
export type RefreshTokenHashDocument = RefreshTokenHash & Document;
export type RefreshTokenHashModel = Model<RefreshTokenHashDocument>;
export declare const RefreshTokenHashSchema: mongoose.Schema<RefreshTokenHash, mongoose.Model<RefreshTokenHash, any, any, any, mongoose.Document<unknown, any, RefreshTokenHash> & RefreshTokenHash & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefreshTokenHash, mongoose.Document<unknown, {}, RefreshTokenHash> & RefreshTokenHash & {
    _id: mongoose.Types.ObjectId;
}>;
