import { Connection } from 'mongoose';
import { QuestionTypeDocument, QuestionTypeModel } from './question.type.model';
import { GetQuestionTypeInterafce, GetAllQuestionTypesInterface, BulkCreateQuestionTypesInterface, CheckDublicateQuestionTypesInterface, UpdateResultsPushInterface, UpdateQuestionsPushInterface, UpdateQuestionsPullInterface, UpdateAllManyQuestionsPullInterface } from './question.types.interface';
export declare class QuestionTypesService {
    protected connection: Connection;
    private questionTypes;
    constructor(connection: Connection, questionTypes: QuestionTypeModel);
    getQuestionType(payload: GetQuestionTypeInterafce): Promise<QuestionTypeDocument>;
    getAllQuestionTypes(payload: GetAllQuestionTypesInterface): Promise<Array<QuestionTypeDocument>>;
    bulKCreateQuestionTypes(payload: BulkCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>>;
    checkDublicateQuestionTypes(payload: CheckDublicateQuestionTypesInterface): Promise<boolean>;
    updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean>;
    updateQuestionsPush(payload: UpdateQuestionsPushInterface): Promise<boolean>;
    updateQuestionsPull(payload: UpdateQuestionsPullInterface): Promise<boolean>;
    updateAllManyQuestionsPull(payload: UpdateAllManyQuestionsPullInterface): Promise<boolean>;
}
