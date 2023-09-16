export interface GetAllQuizsInterface {
}
export interface GetAllQuestionTypesInterface {
}
export interface GetResultsForQuizInterface {
    quizId: string;
}
export interface ResetResultQuizInterface {
    quizId: string;
    userId: string;
    attemptId: string;
}
export interface GetQuizAllQuestionsInterface {
    quizId: string;
}
export interface GetFullQuizInterface extends GetQuizAllQuestionsInterface {
}
export interface GetQuizInterface extends GetFullQuizInterface {
}
export interface GetQuizQuestionInterface extends GetQuizAllQuestionsInterface {
    questionId: string;
}
export interface CreateQuizInterface {
    quizname: string;
    draft: boolean;
    authorId: string;
    description: string;
    duration: number;
    numberOfAttempts: number;
}
export interface DeleteQuizInterface {
    id: string;
    authorId: string;
}
export interface EditQuizDraftInterface {
    draft: boolean;
    id: string;
}
export interface CreateQuestionInterface {
    quizId: string;
    questionTypeId: string;
    question: string;
    answerOptions: Array<string>;
    answer: string;
    answerArray: Array<string>;
    draft: boolean;
    authorId: string;
}
export interface EditQuestionDraftInterface {
    draft: boolean;
    id: string;
}
export interface DeleteQuestionInterface {
    id: string;
    authorId: string;
}
export interface OrderQuestionsInterface extends GetQuizAllQuestionsInterface {
    orderQuestions: Array<{
        id: string;
        order: number;
    }>;
}
