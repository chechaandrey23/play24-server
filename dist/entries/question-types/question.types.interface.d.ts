import { ClientSession } from 'mongoose';
interface QuestionTypeInterface {
    session?: ClientSession;
}
export interface GetQuestionTypeInterafce extends QuestionTypeInterface {
    id: string;
}
export interface GetAllQuestionTypesInterface extends QuestionTypeInterface {
    limit: number;
    offset: number;
    ids?: Array<string>;
    types?: Array<number>;
}
export interface UpdateResultsPushInterface extends QuestionTypeInterface {
    id: string;
    resultId: string;
}
export interface UpdateQuestionsPushInterface extends QuestionTypeInterface {
    id: string;
    questionId: string;
}
export interface UpdateQuestionsPullInterface extends QuestionTypeInterface {
    id: string;
    questionId: string;
}
export interface UpdateAllManyQuestionsPullInterface extends QuestionTypeInterface {
    questionIds: Array<string>;
}
export interface BulkCreateQuestionTypesInterface extends QuestionTypeInterface {
    questionTypes: Array<{
        type: number;
        title?: string;
        description?: string;
    }>;
}
export interface CheckDublicateQuestionTypesInterface extends QuestionTypeInterface {
    types: Array<number>;
}
export {};
