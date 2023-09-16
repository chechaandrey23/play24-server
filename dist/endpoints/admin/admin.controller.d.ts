import { Request } from 'express';
import { AdminService } from './admin.service';
import { QuizDTO, ResultsForQuizDTO, ResetResultQuizAttemptDTO, QuizAllQuestionsDTO, QuizQuestionDTO, CreateQuizDTO, DeleteQuizDTO, CreateQuestionDTO, DeleteQuestionDTO, OrderQuestionsDTO, EditQuizDraftDTO, EditQuestionDraftDTO } from './admin.dto';
import { QuizDocument } from '../../entries/quizs/quiz.model';
import { QuestionDocument } from '../../entries/questions/question.model';
import { QuestionTypeDocument } from '../../entries/question-types/question.type.model';
import { AttemptDocument } from '../../entries/attempts/attempt.model';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getAllQuizs(req: Request): Promise<Array<QuizDocument>>;
    getQuiz(req: Request, quizDTO: QuizDTO): Promise<QuizDocument>;
    getResultsForQuiz(req: Request, resultsForQuiz: ResultsForQuizDTO): Promise<QuizDocument>;
    resetResultQuiz(req: Request, resetResultQuizAttempt: ResetResultQuizAttemptDTO): Promise<AttemptDocument>;
    getQuizAllQuestions(req: Request, quizAllQuestionsDTO: QuizAllQuestionsDTO): Promise<Array<QuestionDocument>>;
    getQuizAllQuestions2(req: Request, quizAllQuestionsDTO: QuizAllQuestionsDTO): Promise<QuizDocument>;
    getQuizQuestion(req: Request, quizQuestionDTO: QuizQuestionDTO): Promise<QuestionDocument>;
    createQuiz(req: Request, createQuizDTO: CreateQuizDTO): Promise<QuizDocument>;
    deleteQuiz(req: Request, deleteQuizDTO: DeleteQuizDTO): Promise<QuizDocument>;
    editQuizDraft(req: Request, editQuizDraftDTO: EditQuizDraftDTO): Promise<QuizDocument>;
    createQuestion(req: Request, createQuestionDTO: CreateQuestionDTO): Promise<QuestionDocument>;
    editQuestionDraft(req: Request, editQuestionDraftDTO: EditQuestionDraftDTO): Promise<QuestionDocument>;
    deleteQuestion(req: Request, deleteQuestionDTO: DeleteQuestionDTO): Promise<QuestionDocument>;
    orderQuestions(req: Request, orderQuestionsDTO: OrderQuestionsDTO): Promise<Array<QuestionDocument>>;
    getAllQuestionTypes(req: Request): Promise<Array<QuestionTypeDocument>>;
}
