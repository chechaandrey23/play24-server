import { Request } from 'express';
import { UserService } from './user.service';
import { QuizDTO, QuizAttemptDTO, QuizAttemptQuestionDTO, AnswerDTO } from './user.dto';
import { QuizDocument } from '../../entries/quizs/quiz.model';
import { QuestionDocument } from '../../entries/questions/question.model';
import { AttemptDocument } from '../../entries/attempts/attempt.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getQuizs(req: Request): Promise<Array<QuizDocument>>;
    getQuiz(req: Request, quizDTO: QuizDTO): Promise<QuizDocument>;
    getQuizWithAttempt(req: Request, quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument>;
    createAttempt(req: Request, quizDTO: QuizDTO): Promise<AttemptDocument>;
    getQuizAllAttempts(req: Request, quizDTO: QuizDTO): Promise<Array<AttemptDocument>>;
    getQuizAllQuestions(req: Request, quizAttemptDTO: QuizAttemptDTO): Promise<Array<QuestionDocument>>;
    getQuizQuestion(req: Request, quizAttemptQuestionDTO: QuizAttemptQuestionDTO): Promise<QuestionDocument>;
    setQuizQuestion(req: Request, quizAttemptQuestionDTO: QuizAttemptQuestionDTO, answerDTO: AnswerDTO): Promise<QuestionDocument>;
    finishQuiz(req: Request, quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument>;
    getQuizAllQuestions2(req: Request, quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument>;
}
