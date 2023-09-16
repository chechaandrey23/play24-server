import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MongooseSession, TypeMethodWithSession } from '../../../utils/mongoose.session';
import { HashsService } from '../../../secondaries/hashs/hashs.service';
import { UsersService } from '../../../entries/users/users.service';
import { RolesService } from '../../../entries/roles/roles.service';
import { PasswordsService } from '../../../entries/passwords/passwords.service';
import { UserDocument } from '../../../entries/users/user.model';
import { RoleDocument } from '../../../entries/roles/role.model';
import { CheckUserInterface, CheckUserIdInterface, CreateUserInterface, ComparePasswordInterface, GetUserIdInterface, GetRolesInterface } from './mediary.users.interface';
export declare class MediaryUsersService implements MongooseSession {
    protected connection: Connection;
    private configService;
    private hashsService;
    private usersService;
    private rolesService;
    private passwordsService;
    constructor(connection: Connection, configService: ConfigService, hashsService: HashsService, usersService: UsersService, rolesService: RolesService, passwordsService: PasswordsService);
    withSession: TypeMethodWithSession;
    checkUser(data: CheckUserInterface): Promise<UserDocument | null>;
    createUser(payload: CreateUserInterface): Promise<UserDocument>;
    comparePassword(data: ComparePasswordInterface): Promise<boolean>;
    checkUserId(data: CheckUserIdInterface): Promise<UserDocument | null>;
    getUser(data: GetUserIdInterface): Promise<UserDocument | null>;
    getRoles(payload: GetRolesInterface): Promise<Array<RoleDocument>>;
}
