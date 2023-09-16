import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
import { Result } from '../results/result.model';
import { Question } from '../questions/question.model';
import { Attempt } from '../attempts/attempt.model';
export declare class Quiz {
    quizname: string;
    description: string;
    duration: number;
    numberOfAttempts: number;
    draft: boolean;
    author: User;
    questions: Array<Question>;
    results: Array<Result>;
    attempts: Array<Attempt>;
}
export type QuizDocument = Quiz & Document;
export type QuizModel = Model<QuizDocument>;
export declare const QuizSchema: mongoose.Schema<Quiz, mongoose.Model<Quiz, any, any, any, mongoose.Document<unknown, any, Quiz> & Quiz & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Quiz, mongoose.Document<unknown, {}, Quiz> & Quiz & {
    _id: mongoose.Types.ObjectId;
}>;
