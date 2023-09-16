import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { MediaryQuizsService } from '../../mediaries/user/quizs/mediary.quizs.service';
import { QuizDocument } from '../../entries/quizs/quiz.model';
import { QuestionDocument } from '../../entries/questions/question.model';
import { AttemptDocument } from '../../entries/attempts/attempt.model';
import { GetQuizsInterface, GetQuizInterface, GetQuizWithAttemptInterface, CreateAttemptInterface, GetQuizAllAttemptsInterface, GetQuizAllQuestionsInterface, GetQuizQuestionInterface, SetQuizQuestionInterface, FinishQuizAttemptInterface, GetFullQuizInterface } from './user.interface';
export declare class UserService {
    private configService;
    private mediaryQuizsService;
    constructor(configService: ConfigService, mediaryQuizsService: MediaryQuizsService);
    getQuizs(req: Request, payload: GetQuizsInterface): Promise<Array<QuizDocument>>;
    getQuiz(req: Request, payload: GetQuizInterface): Promise<QuizDocument>;
    getQuizWithAttempt(req: Request, payload: GetQuizWithAttemptInterface): Promise<QuizDocument>;
    createAttempt(req: Request, payload: CreateAttemptInterface): Promise<AttemptDocument>;
    getQuizAllAttempts(req: Request, payload: GetQuizAllAttemptsInterface): Promise<Array<AttemptDocument>>;
    getQuizAllQuestions(req: Request, payload: GetQuizAllQuestionsInterface): Promise<Array<QuestionDocument>>;
    getQuizQuestion(req: Request, payload: GetQuizQuestionInterface): Promise<QuestionDocument>;
    setQuizQuestion(req: Request, payload: SetQuizQuestionInterface): Promise<QuestionDocument>;
    finishQuizAttempt(req: Request, payload: FinishQuizAttemptInterface): Promise<QuizDocument>;
    getFullQuiz(req: Request, payload: GetFullQuizInterface): Promise<QuizDocument>;
}
