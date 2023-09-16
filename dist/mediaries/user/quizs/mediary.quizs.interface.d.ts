import { ClientSession } from 'mongoose';
export interface GetQuizsInterface {
    userId: string;
}
export interface GetQuizInterface {
    userId: string;
    quizId: string;
    attemptId?: string;
}
export interface CheckExpiredAttemptInterface {
    session: ClientSession;
    quizId: string;
    userId: string;
    attemptId: string;
}
export interface CreateAttemptInterface {
    quizId: string;
    userId: string;
}
export interface GetQuizAllAttemptsInterface {
    quizId: string;
    userId: string;
}
export interface GetQuizAllQuestionsInterface {
    quizId: string;
    userId: string;
    attemptId: string;
}
export interface GetQuizQuestionInterface {
    questionId: string;
    quizId: string;
    userId: string;
    attemptId: string;
}
export interface SetQuizQuestionInterface {
    userId: string;
    questionId: string;
    quizId: string;
    attemptId: string;
    answer: string;
    answerArray: Array<string>;
}
export interface FinishQuizAttemptInterface {
    userId: string;
    quizId: string;
    attemptId: string;
}
export interface GetFullQuizInterface {
    userId: string;
    quizId: string;
    attemptId: string;
}
