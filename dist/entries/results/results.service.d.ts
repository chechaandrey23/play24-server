import { Connection } from 'mongoose';
import { ResultDocument, ResultModel } from './result.model';
import { GetQuestionsForUserInterface, GetAllResultsInterface, GetResultInterface, SetAnswerInterface, GetResultOneInterface, EditUserAnswerInterface } from './results.interface';
export declare class ResultsService {
    protected connection: Connection;
    private results;
    constructor(connection: Connection, results: ResultModel);
    getQuestionsForUser(payload: GetQuestionsForUserInterface): Promise<Array<ResultDocument>>;
    getResult(payload: GetResultInterface): Promise<Array<ResultDocument>>;
    getAllResults(payload: GetAllResultsInterface): Promise<Array<ResultDocument>>;
    setAnswer(payload: SetAnswerInterface): Promise<ResultDocument>;
    getResultOne(payload: GetResultOneInterface): Promise<ResultDocument>;
    editUserAnswer(payload: EditUserAnswerInterface): Promise<boolean>;
}
