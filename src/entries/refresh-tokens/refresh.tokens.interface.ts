import {ClientSession} from 'mongoose';

interface RefreshTokenInterface {
	session?: ClientSession;
}

export interface GetRefreshTokenInterface extends RefreshTokenInterface {
  id?: string;
  userId?: string;
  withRefreshTokenHash?: boolean;
	where?: {[key: string]: any}
}

export interface CountRefreshTokensInterface extends RefreshTokenInterface {
  userId?: string;
}

export interface CreateRefreshTokenInterface extends RefreshTokenInterface {
  userId: string;
  ip: string;
  userAgent: string;
  dateEnd: Date;
}

export interface ReplaceExpiredRefreshTokenInterface extends CreateRefreshTokenInterface {}

export interface RefreshRefreshTokenInterface extends RefreshTokenInterface {
  id: string;
  userId: string;
  ip: string;
  userAgent: string;
  dateEnd: Date;
}

export interface EraseRefreshTokenInterface extends RefreshTokenInterface {
  id: string;
  userId: string;
}

export interface EraseAllRefreshTokensInterface extends RefreshTokenInterface {
  userId: string;
}

export interface UpdateRefreshTokenHashSetInterface extends RefreshTokenInterface {
	id: string;
  refreshTokenHashId: string;
}
