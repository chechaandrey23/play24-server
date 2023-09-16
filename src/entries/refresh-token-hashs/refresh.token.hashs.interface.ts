import {ClientSession} from 'mongoose';

interface RefreshTokenHashInterface {
	session?: ClientSession;
}

export interface GetRefreshTokenHashInterface extends RefreshTokenHashInterface {
  id?: string;
  refreshTokenId?: string;
}

export interface CreateRefreshTokenHashInterface extends RefreshTokenHashInterface {
  token: string;
  refreshTokenId: string;
}

export interface CheckDublicateRefreshTokenIdInterface extends RefreshTokenHashInterface {
  refreshTokenId: string;
}

export interface ReplaceRefreshTokenHashInterface extends RefreshTokenHashInterface {
  id: string;
  refreshTokenId: string;
  token: string;
}

export interface EraseRefreshTokenHashInterface extends RefreshTokenHashInterface {
  id: string;
  refreshTokenId: string;
}

export interface EraseAllRefreshTokenHashsInterface extends RefreshTokenHashInterface {
  ids: Array<string>;
  refreshTokenIds: Array<string>;
}
