import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../users/user.model';
import { Quiz } from '../quizs/quiz.model';
import { Attempt } from '../attempts/attempt.model';
import { Question } from '../questions/question.model';
import { QuestionType } from '../question-types/question.type.model';
export declare class Result {
    user: User;
    quiz: Quiz;
    question: Question;
    attempt: Attempt;
    questionType: QuestionType;
    userAnswer: string | Array<string>;
}
export type ResultDocument = Result & Document;
export type ResultModel = Model<ResultDocument>;
export declare const ResultSchema: mongoose.Schema<Result, mongoose.Model<Result, any, any, any, mongoose.Document<unknown, any, Result> & Result & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Result, mongoose.Document<unknown, {}, Result> & Result & {
    _id: mongoose.Types.ObjectId;
}>;
