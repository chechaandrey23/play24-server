export type AuthCookieInterface = string;
export interface AuthCookieObjectInterface {
    name: string;
    httpOnly: boolean;
}
export type AuthCookiesInterface = Array<AuthCookieInterface | AuthCookieObjectInterface>;
declare const _default: (() => {
    names: AuthCookiesInterface;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    names: AuthCookiesInterface;
}>;
export default _default;
