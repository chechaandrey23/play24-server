import {ClientSession} from 'mongoose';

interface QuestionInterface {
	session?: ClientSession;
}

export interface GetQuestionsInterface extends QuestionInterface {
  limit: number;
  offset: number;
	draft?: boolean;
  quizId?: string;
  ids?: Array<string>;
  withQuestionType?: boolean;
	withResults?: boolean;
  resultsWhere?: {[key: string]: any};
}

export interface GetQuestionInterface extends QuestionInterface {
  id: string;
	draft?: boolean;
  quizId?: string;
  withQuestionType?: boolean;
	withQuiz?: boolean;
  withResults?: boolean;
  resultsWhere?: {[key: string]: any};
	withQuizAttempts?: boolean;
	quizAttemptsWhere?: {[key: string]: any};
}

export interface UpdateResultsPushInterface extends QuestionInterface {
  id: string;
  resultId: string;
}

export interface CountQuestionsInterface extends QuestionInterface {
  quizId: string;
	draft?: boolean;
}

export interface CreateQuestionInterface extends QuestionInterface {
  quizId: string;
  questionTypeId: string;
  question: string;
  answerOptions?: Array<string>;
  answer?: string|Array<string>;
  order: number;
	draft: boolean;
	authorId: string;
}

export interface EditQuestionDraftInterface extends DeleteOneInterface {
	draft: boolean;
}

export interface EditOrderInterface extends QuestionInterface {
  id: string;
  quizId: string;
  order: number;
}

export interface EditOrderNewInterface extends QuestionInterface {
	orderQuestions: Array<{id: string, order: number}>;
	quizId: string;
}

export interface DeleteOneInterface extends QuestionInterface {
  id: string;
}

export interface DeleteManyInterface extends QuestionInterface {
  ids: Array<string>;
}
