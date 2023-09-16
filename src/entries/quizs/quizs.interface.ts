import {ClientSession} from 'mongoose';

interface QuizInterface {
	session?: ClientSession;
}

export interface GetAllQuizsInterface extends QuizInterface {
  limit: number;
  offset: number;
	draft?: boolean;
	withAttempts?: boolean;
	attemptsWhere?: {[key: string]: any};
}

export interface GetQuizInterface extends QuizInterface {
  id: string;
	draft?: boolean;
  where?: {[key: string]: any};
  withQuestions?: boolean;
	questionsWhere?: {[key: string]: any};
	withQuestionType?: boolean;
	withResults?: boolean;
  resultsWhere?: {[key: string]: any};
	withAttempts?: boolean;
	attemptsWhere?: {[key: string]: any};
	withAttemptUser?: boolean;
	withAttemptResults?: boolean;
	attemptResultsWhere?: {[key: string]: any};
}

export interface UpdateResultsPushInterface extends QuizInterface {
  id: string;
  resultId: string;
}

export interface UpdateAttemptsPushInterface extends QuizInterface {
	id: string;
  attemptId: string;
}

export interface UpdateCompletedUsersPushInterace extends QuizInterface {
  id: string;
  userId: string;
}

export interface UpdateCompletedUsersPullInterface extends UpdateCompletedUsersPushInterace {}

export interface UpdateQuestionsPushInterface extends QuizInterface {
  id: string;
  questionId: string;
}

export interface UpdateQuestionsPullInterface extends QuizInterface {
  id: string;
  questionId: string;
}

export interface CreateQuizInterface extends QuizInterface {
  quizname: string;
	draft: boolean;
	authorId: string;
	description: string;
	duration: number;
	numberOfAttempts: number;
}

export interface DeleteOneInterface extends QuizInterface {
  id: string;
}

export interface EditQuizDraftInterface extends DeleteOneInterface {
	draft: boolean;
}
