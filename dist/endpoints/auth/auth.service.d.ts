import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthCookiesService } from '../../secondaries/auth-cookies/auth.cookies.service';
import { MediaryUsersService } from '../../mediaries/auth/users/mediary.users.service';
import { MediaryRefreshTokensService } from '../../mediaries/auth/refresh-tokens/mediary.refresh.tokens.service';
import { UserDocument } from '../../entries/users/user.model';
import { RoleDocument } from '../../entries/roles/role.model';
import { AccessTokenPayloadInterafce, RefreshTokenPayloadInterafce, LoginInterface, MainLoginInterface, LogoutInterface, RefreshInterface, GetRolesInterface, RegistrationInterface, GetUserInterface } from './auth.interface';
export declare class AuthService {
    private jwtService;
    private configService;
    private authCookiesService;
    private mediaryUsersService;
    private mediaryRefreshTokensService;
    constructor(jwtService: JwtService, configService: ConfigService, authCookiesService: AuthCookiesService, mediaryUsersService: MediaryUsersService, mediaryRefreshTokensService: MediaryRefreshTokensService);
    login(req: Request, payload: LoginInterface): Promise<UserDocument>;
    mainLogin(req: Request, payload: MainLoginInterface): Promise<UserDocument>;
    logout(req: Request, payload: LogoutInterface): Promise<void>;
    getRoles(req: Request, payload: GetRolesInterface): Promise<Array<RoleDocument>>;
    registration(req: Request, payload: RegistrationInterface): Promise<UserDocument>;
    getUser(req: Request, payload: GetUserInterface): Promise<UserDocument>;
    refresh(req: Request, payload: RefreshInterface): Promise<UserDocument>;
    protected generateAccessToken(payload: AccessTokenPayloadInterafce): Promise<string>;
    protected generateRefreshToken(payload: RefreshTokenPayloadInterafce): Promise<string>;
}
