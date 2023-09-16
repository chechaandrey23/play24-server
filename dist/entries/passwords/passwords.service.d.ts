import { Connection } from 'mongoose';
import { Password, PasswordModel } from './password.model';
import { GetPasswordInterface, CreatePasswordInterface, CheckDublicateUserIdInterface } from './passwords.interface';
import { HashsService } from '../../secondaries/hashs/hashs.service';
export declare class PasswordsService {
    protected connection: Connection;
    private passwords;
    private hashsService;
    constructor(connection: Connection, passwords: PasswordModel, hashsService: HashsService);
    getPassword(payload: GetPasswordInterface): Promise<Password>;
    createPassword(payload: CreatePasswordInterface): Promise<Password>;
    checkDublicateUserId(payload: CheckDublicateUserIdInterface): Promise<boolean>;
}
