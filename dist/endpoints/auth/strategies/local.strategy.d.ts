import { MediaryUsersService } from '../../../mediaries/auth/users/mediary.users.service';
import { ExpressUserAccessToken } from './strategies.interface';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private mediaryUsersService;
    constructor(mediaryUsersService: MediaryUsersService);
    validate(username: string, password: string): Promise<ExpressUserAccessToken>;
}
export {};
