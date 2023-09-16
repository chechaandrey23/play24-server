import { Connection } from 'mongoose';
import { QuestionDocument, QuestionModel } from './question.model';
import { GetQuestionsInterface, GetQuestionInterface, UpdateResultsPushInterface, CountQuestionsInterface, EditOrderInterface, EditOrderNewInterface, CreateQuestionInterface, DeleteOneInterface, DeleteManyInterface, EditQuestionDraftInterface } from './questions.interface';
export declare class QuestionsService {
    protected connection: Connection;
    private questions;
    constructor(connection: Connection, questions: QuestionModel);
    getQuestions(payload: GetQuestionsInterface): Promise<Array<QuestionDocument>>;
    getQuestion(payload: GetQuestionInterface): Promise<QuestionDocument>;
    countQuestions(payload: CountQuestionsInterface): Promise<number>;
    createQuestion(payload: CreateQuestionInterface): Promise<QuestionDocument>;
    editQuestionDraft(payload: EditQuestionDraftInterface): Promise<QuestionDocument>;
    editOrder(payload: EditOrderInterface): Promise<boolean>;
    editOrderNew(payload: EditOrderNewInterface): Promise<boolean>;
    updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean>;
    deleteOne(payload: DeleteOneInterface): Promise<boolean>;
    deleteMany(payload: DeleteManyInterface): Promise<boolean>;
}
