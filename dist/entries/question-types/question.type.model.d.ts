import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { Result } from '../results/result.model';
import { Question } from '../questions/question.model';
export declare class QuestionType {
    type: number;
    title: string;
    description: string;
    questions: Array<Question>;
    results: Array<Result>;
}
export type QuestionTypeDocument = QuestionType & Document;
export type QuestionTypeModel = Model<QuestionTypeDocument>;
export declare const QuestionTypeSchema: mongoose.Schema<QuestionType, mongoose.Model<QuestionType, any, any, any, mongoose.Document<unknown, any, QuestionType> & QuestionType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, QuestionType, mongoose.Document<unknown, {}, QuestionType> & QuestionType & {
    _id: mongoose.Types.ObjectId;
}>;
