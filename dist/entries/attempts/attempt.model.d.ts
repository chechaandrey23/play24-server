import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
import { Quiz } from '../quizs/quiz.model';
import { Result } from '../results/result.model';
export declare class Attempt {
    dateStart: Date;
    dateEnd: Date;
    user: User;
    quiz: Quiz;
    results: Array<Result>;
    irRelevant: boolean;
}
export type AttemptDocument = Attempt & Document;
export type AttemptModel = Model<AttemptDocument>;
export declare const AttemptSchema: mongoose.Schema<Attempt, mongoose.Model<Attempt, any, any, any, mongoose.Document<unknown, any, Attempt> & Attempt & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attempt, mongoose.Document<unknown, {}, Attempt> & Attempt & {
    _id: mongoose.Types.ObjectId;
}>;
