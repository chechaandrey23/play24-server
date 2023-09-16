import { Connection } from 'mongoose';
import { UserDocument, UserModel } from './user.model';
import { RoleModel } from '../roles/role.model';
import { UserRolesService } from '../../secondaries/user-roles/user.roles.service';
import { GetUserInterface, CreateUserInterface, CheckDublicateUsernameInterface, UpdateRolesSetInterface, UpdateResultsPushInterface, UpdateAttemptsPushInterface, UpdateCompletedQuizsPushInterface, UpdateCompletedQuizsPullInterface, UpdateAllCompletedQuizsPullInterface, UpdateRefreshTokensPushInterface, UpdateRefreshTokensPullInterface, UpdateRefreshTokensPullAllInterface, UpdatePasswordSetInterface } from './users.interface';
export declare class UsersService {
    protected connection: Connection;
    private users;
    private roles;
    private userRolesService;
    constructor(connection: Connection, users: UserModel, roles: RoleModel, userRolesService: UserRolesService);
    getUser(payload: GetUserInterface): Promise<UserDocument | null>;
    createUser(payload: CreateUserInterface): Promise<UserDocument>;
    checkDublicateUsername(payload: CheckDublicateUsernameInterface): Promise<boolean>;
    updateRolesSet(payload: UpdateRolesSetInterface): Promise<boolean>;
    updatePasswordSet(payload: UpdatePasswordSetInterface): Promise<boolean>;
    updateRefreshTokensPush(payload: UpdateRefreshTokensPushInterface): Promise<boolean>;
    updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean>;
    updateAttemptsPush(payload: UpdateAttemptsPushInterface): Promise<boolean>;
    updateCompletedQuizsPush(payload: UpdateCompletedQuizsPushInterface): Promise<boolean>;
    updateRefreshTokensPull(payload: UpdateRefreshTokensPullInterface): Promise<boolean>;
    updateRefreshTokensPullAll(payload: UpdateRefreshTokensPullAllInterface): Promise<boolean>;
    updateCompletedQuizsPull(payload: UpdateCompletedQuizsPullInterface): Promise<boolean>;
    updateAllCompletedQuizsPull(payload: UpdateAllCompletedQuizsPullInterface): Promise<boolean>;
}
