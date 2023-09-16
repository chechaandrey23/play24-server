import { ClientSession } from 'mongoose';
interface AttemptInterface {
    session?: ClientSession;
}
export interface CreateAttemptInterface extends AttemptInterface {
    quizId: string;
    userId: string;
    dateStart: Date;
    irRelevant: boolean;
}
export interface GetAllAttemptsInterface extends AttemptInterface {
    limit: number;
    offset: number;
    userId?: string;
    quizId: string;
    irRelevant: boolean;
    withQuiz?: boolean;
    withResults?: boolean;
    withUser?: boolean;
}
export interface GetAttemptInterface extends AttemptInterface {
    id: string;
    userId: string;
    quizId: string;
    irRelevant?: boolean;
    withQuiz?: boolean;
    withResults?: boolean;
}
export interface UpdateResultsPushInterface extends AttemptInterface {
    id: string;
    resultId: string;
}
export interface EditDateEndInterface extends AttemptInterface {
    id: string;
    userId: string;
    quizId: string;
    dateEnd: Date;
}
export interface EditIrRelevantInterface extends AttemptInterface {
    id: string;
    userId: string;
    quizId: string;
    irRelevant: boolean;
}
export {};
