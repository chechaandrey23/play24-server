import { ClientSession } from 'mongoose';
export interface CheckUserInterface {
    username: string;
    password: string;
}
export interface CheckUserIdInterface {
    userId: string;
}
export interface ComparePasswordInterface {
    userId: string;
    password: string;
    session: ClientSession;
}
export interface GetUserIdInterface {
    id: string;
}
export interface GetRolesInterface {
}
export interface CreateUserInterface {
    username: string;
    password: string;
    roles?: Array<number>;
    roleIds?: Array<string>;
}
