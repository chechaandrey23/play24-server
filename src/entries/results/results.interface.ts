import {ClientSession} from 'mongoose';

interface ResultInterface {
	session?: ClientSession;
}

export interface GetQuestionsForUserInterface extends ResultInterface {
  userId: string;
  quizId: string;
  questionIds: Array<string>;
}

export interface GetAllResultsInterface extends ResultInterface {
  userId?: string;
  quizId: string;
  irRelevant: boolean;
  limit: number;
  offset: number;
}

export interface GetResultInterface extends ResultInterface {
	irRelevant: boolean;
	userId: string;
  quizId: string;
	limit: number;
  offset: number;
}

export interface SetAnswerInterface extends ResultInterface {
  userId: string;
  quizId: string;
  questionId: string;
  questionTypeId: string;
	attemptId: string;
  answer: string|Array<string>;
}

export interface EditManyIrRelevantInterface extends ResultInterface {
  userId: string;
  quizId: string;
  irRelevant: boolean;
}

export interface GetResultOneInterface extends ResultInterface {
	userId: string;
  quizId: string;
  questionId: string;
  questionTypeId: string;
	attemptId: string;
}

export interface EditUserAnswerInterface extends ResultInterface {
	id: string;
	answer: string|Array<string>;
}
