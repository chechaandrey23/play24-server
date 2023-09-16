import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
export declare class Role {
    role: number;
    title: string;
    description: string;
    users: Array<User>;
}
export type RoleDocument = Role & Document;
export type RoleModel = Model<RoleDocument>;
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role> & Role & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, Role> & Role & {
    _id: mongoose.Types.ObjectId;
}>;
