import {registerAs} from '@nestjs/config';

export type AuthCookieInterface = string;
export interface AuthCookieObjectInterface {
  name: string;
  httpOnly: boolean;
}
export type AuthCookiesInterface = Array<AuthCookieInterface|AuthCookieObjectInterface>;

export default registerAs('auth-cookies', () => ({
  names: [
    {name: 'AccessToken', httpOnly: true},
    {name: 'RefreshToken', httpOnly: true},
    'Roles',

  ] as AuthCookiesInterface,
}));
