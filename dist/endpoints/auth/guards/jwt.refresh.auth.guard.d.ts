import { AuthCookiesService } from '../../../secondaries/auth-cookies/auth.cookies.service';
declare const JWTRefreshAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JWTRefreshAuthGuard extends JWTRefreshAuthGuard_base {
    private authCookiesService;
    constructor(authCookiesService: AuthCookiesService);
    handleRequest(err: any, user: any, info: any, context: any, status: any): any;
}
export {};
