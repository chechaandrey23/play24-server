import {ClientSession} from 'mongoose';

interface UserInterface {
	session?: ClientSession;
}

export interface GetUserInterface extends UserInterface {
  id?: string;
	username?: string;
  withRoles?: boolean;
}

export interface CreateUserInterface extends UserInterface {
  username: string;
}

export interface CheckDublicateUsernameInterface extends UserInterface {
  username: string;
}

export interface UpdateRolesSetInterface extends UserInterface {
  id: string;
  roleIds: Array<string>;
}

export interface UpdatePasswordSetInterface extends UserInterface {
	id: string;
	passwordId: string;
}

export interface UpdateRefreshTokensPushInterface extends UserInterface {
	id: string;
  refreshTokenId: string;
}

export interface UpdateRefreshTokensPullAllInterface extends UserInterface {
	id: string;
  refreshTokenIds: Array<string>;
}

export interface UpdateResultsPushInterface extends UserInterface {
  id: string;
  resultId: string;
}

export interface UpdateAttemptsPushInterface extends UserInterface {
	id: string;
  attemptId: string;
}

export interface UpdateCompletedQuizsPushInterface extends UserInterface {
  id: string;
  quizId: string;
}

export interface UpdateCompletedQuizsPullInterface extends UpdateCompletedQuizsPushInterface {}

export interface UpdateAllCompletedQuizsPullInterface extends UserInterface {
	quizId: string;
}

export interface UpdateRefreshTokensPullInterface extends UserInterface {
	id: string;
  refreshTokenId: string;
}
