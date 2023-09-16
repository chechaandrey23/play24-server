import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
export declare class Password {
    hash: string;
    user: User;
}
export type PasswordDocument = Password & Document;
export type PasswordModel = Model<PasswordDocument>;
export declare const PasswordSchema: mongoose.Schema<Password, mongoose.Model<Password, any, any, any, mongoose.Document<unknown, any, Password> & Password & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Password, mongoose.Document<unknown, {}, Password> & Password & {
    _id: mongoose.Types.ObjectId;
}>;
