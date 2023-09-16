import { ConfigService } from '@nestjs/config';
interface CookieSource {
    name: string;
    value: any;
    httpOnly: boolean;
    ttl: number;
    touch: boolean;
}
type CookiesSource = {
    [key: string]: CookieSource;
};
export declare class AuthCookiesService {
    private configService;
    constructor(configService: ConfigService);
    protected cookies: CookiesSource;
    add(name: string, value: any, httpOnly: boolean, ttl: number): void;
    delete(name: string): void;
    deleteAll(): void;
    toArrayString(): Array<string>;
}
export {};
