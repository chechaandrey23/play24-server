import { ConfigService } from '@nestjs/config';
import { ExpressUserAccessToken } from './strategies.interface';
export interface JWTAccessPaylaodInterface {
    id: string;
    roles: Array<number>;
}
declare const JwtAccessStrategy_base: new (...args: any[]) => any;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(ctx: any, payload: JWTAccessPaylaodInterface): Promise<ExpressUserAccessToken>;
}
export {};
