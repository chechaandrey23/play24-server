export interface AccessTokenPayloadInterafce {
  id: number;
  roles: Array<number>;
}

export interface RefreshTokenPayloadInterafce extends AccessTokenPayloadInterafce {
  refreshTokenId: string;
}

export interface LoginInterface {
  userId: string;
  userAgent: string;
  ip: string;
}

import {User, UserDocument} from '../../entries/users/user.model';

export interface MainLoginInterface {
  user: UserDocument;
  userAgent: string;
  ip: string;
}

export interface LogoutInterface {
  userId?: string|null;
  refreshTokenId?: string|null;
  fullExit?: boolean;
  //userAgent?: string;
  //ip?: string;
}

export interface RefreshInterface {
  userId: string;
  refreshTokenId: string;
  userAgent: string;
  ip: string;
}

export interface GetRolesInterface {}

export interface RegistrationInterface {
  username: string;
  password: string;
  roles: Array<string>;
  userAgent: string;
  ip: string;
}

export interface GetUserInterface {
  userId: string;
}
