import { Connection } from 'mongoose';
import { QuizDocument, QuizModel } from './quiz.model';
import { QuestionModel } from '../questions/question.model';
import { GetAllQuizsInterface, GetQuizInterface, UpdateResultsPushInterface, UpdateAttemptsPushInterface, UpdateCompletedUsersPushInterace, UpdateCompletedUsersPullInterface, CreateQuizInterface, DeleteOneInterface, EditQuizDraftInterface, UpdateQuestionsPushInterface, UpdateQuestionsPullInterface } from './quizs.interface';
export declare class QuizsService {
    protected connection: Connection;
    private quizs;
    private questions;
    constructor(connection: Connection, quizs: QuizModel, questions: QuestionModel);
    getAllQuizs(payload: GetAllQuizsInterface): Promise<Array<QuizDocument>>;
    getQuiz(payload: GetQuizInterface): Promise<QuizDocument>;
    createQuiz(payload: CreateQuizInterface): Promise<QuizDocument>;
    editQuizDraft(payload: EditQuizDraftInterface): Promise<QuizDocument>;
    updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean>;
    updateAttemptsPush(payload: UpdateAttemptsPushInterface): Promise<boolean>;
    updateCompletedUsersPush(payload: UpdateCompletedUsersPushInterace): Promise<boolean>;
    updateCompletedUsersPull(payload: UpdateCompletedUsersPullInterface): Promise<boolean>;
    updateQuestionsPush(payload: UpdateQuestionsPushInterface): Promise<boolean>;
    updateQuestionsPull(payload: UpdateQuestionsPullInterface): Promise<boolean>;
    deleteOne(payload: DeleteOneInterface): Promise<boolean>;
}
