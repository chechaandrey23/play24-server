import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
import { RefreshTokenHash } from '../refresh-token-hashs/refresh.token.hash.model';
export declare class RefreshToken {
    ip: string;
    userAgent: string;
    dateEnd: Date;
    user: User;
    refreshTokenHash: RefreshTokenHash;
}
export type RefreshTokenDocument = RefreshToken & Document;
export type RefreshTokenModel = Model<RefreshTokenDocument>;
export declare const RefreshTokenSchema: mongoose.Schema<RefreshToken, mongoose.Model<RefreshToken, any, any, any, mongoose.Document<unknown, any, RefreshToken> & RefreshToken & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefreshToken, mongoose.Document<unknown, {}, RefreshToken> & RefreshToken & {
    _id: mongoose.Types.ObjectId;
}>;
