import { ConfigService } from '@nestjs/config';
import { MediaryUsersService } from '../../../mediaries/auth/users/mediary.users.service';
import { ExpressUserRefreshToken } from './strategies.interface';
export interface JWTRefreshPaylaodInterface {
    id: string;
    refreshTokenId: string;
}
declare const JwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    private mediaryUsersService;
    constructor(configService: ConfigService, mediaryUsersService: MediaryUsersService);
    validate(ctx: any, payload: JWTRefreshPaylaodInterface): Promise<ExpressUserRefreshToken>;
}
export {};
