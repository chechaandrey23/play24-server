import { Request } from 'express';
import { AuthService } from './auth.service';
import { LogoutDTO, RegistrationDTO } from './auth.dto';
import { UserDocument } from '../../entries/users/user.model';
import { RoleDocument } from '../../entries/roles/role.model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    logIn(req: Request): Promise<UserDocument>;
    logOut(req: Request, logoutDTO: LogoutDTO): Promise<any>;
    getRoles(req: Request): Promise<Array<RoleDocument>>;
    getUser(req: Request): Promise<UserDocument | null>;
    registration(req: Request, registrationDTO: RegistrationDTO): Promise<UserDocument>;
    refresh(req: Request): Promise<UserDocument>;
}
