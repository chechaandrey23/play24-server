import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { Role } from '../roles/role.model';
import { Password } from '../passwords/password.model';
import { RefreshToken } from '../refresh-tokens/refresh.token.model';
import { Result } from '../results/result.model';
import { Attempt } from '../attempts/attempt.model';
export declare class User {
    username: string;
    roles: Array<Role>;
    password: Password;
    refreshTokens: Array<RefreshToken>;
    results: Array<Result>;
    attempts: Array<Attempt>;
}
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}>;
