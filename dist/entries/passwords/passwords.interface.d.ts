import { ClientSession } from 'mongoose';
interface PasswordInterface {
    session?: ClientSession;
}
export interface GetPasswordInterface extends PasswordInterface {
    id?: string;
    userId?: string;
}
export interface CreatePasswordInterface extends PasswordInterface {
    hash: string;
    userId: string;
}
export interface CheckDublicateUserIdInterface extends PasswordInterface {
    userId: string;
}
export {};
