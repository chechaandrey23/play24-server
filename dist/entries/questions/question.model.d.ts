import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { Result } from '../results/result.model';
import { Quiz } from '../quizs/quiz.model';
import { QuestionType } from '../question-types/question.type.model';
import { User } from '../users/user.model';
export declare class Question {
    question: string;
    answerOptions: Array<string>;
    answer: string | Array<string>;
    quiz: Quiz;
    order: number;
    draft: boolean;
    author: User;
    questionType: QuestionType;
    results: Array<Result>;
}
export type QuestionDocument = Question & Document;
export type QuestionModel = Model<QuestionDocument>;
export declare const QuestionSchema: mongoose.Schema<Question, mongoose.Model<Question, any, any, any, mongoose.Document<unknown, any, Question> & Question & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Question, mongoose.Document<unknown, {}, Question> & Question & {
    _id: mongoose.Types.ObjectId;
}>;
