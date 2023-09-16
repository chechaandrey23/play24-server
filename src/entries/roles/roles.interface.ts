import {ClientSession} from 'mongoose';

interface RoleInterface {
	session?: ClientSession;
}

export interface GetAllRolesInterface extends RoleInterface {
  limit: number;
  offset: number;
  ids?: Array<string>;
	roles?: Array<number>;
}

export interface UpdateAllUsersPushInterface extends RoleInterface {
	userId: string;
	ids: Array<string>;
}

export interface BulKCreateRolesInterafce extends RoleInterface {
	roles: Array<{role: number, title?: string, description?: string}>
}

export interface CheckDublicateRolesInterface extends RoleInterface {
	roles: Array<number>;
}
