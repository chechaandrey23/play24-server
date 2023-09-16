import {Injectable} from '@nestjs/common';
import {NotImplementedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {
  AuthCookieInterface,
  AuthCookieObjectInterface,
  AuthCookiesInterface,
} from '../../configs/auth.cookies.config';

interface CookieSource {
  name: string;
  value: any;
  httpOnly: boolean;
  ttl: number;
  touch: boolean;
}

type CookiesSource = {[key: string]: CookieSource};

@Injectable()
export class AuthCookiesService {
	constructor(private configService: ConfigService) {
    const defaultCookies = this.configService.get('auth-cookies.names');
    this.cookies = defaultCookies.reduce(
      (acc: CookiesSource, name: AuthCookieInterface|AuthCookieObjectInterface): CookiesSource => {
        const nameString = name as AuthCookieInterface;
        const nameObject = name as AuthCookieObjectInterface;
        if(!nameObject.hasOwnProperty('name')) {
          acc[nameString] = {
            name: nameString,
            value: '',
            httpOnly: false,
            ttl: 0,
            touch: false,
          }
        } else {
          acc[nameObject.name] = {
            name: nameObject.name,
            value: '',
            httpOnly: nameObject.httpOnly,
            ttl: 0,
            touch: false,
          }
        }
        return acc;
      },
      {} as CookiesSource
    );
  }

  protected cookies: CookiesSource = {};

  public add(name: string, value: any, httpOnly: boolean, ttl: number): void {
    this.cookies[name] = {
      name: name,
      value: value,
      httpOnly: httpOnly,
      ttl: ttl,
      touch: true,
    } as CookieSource;
  }

  public delete(name: string):void {
    if(this.cookies.hasOwnProperty(name)) {
      this.cookies[name].touch = true;
      this.cookies[name].ttl = 0;
      this.cookies[name].value = '';
    }
  }

  public deleteAll():void {
    Object.keys(this.cookies).forEach((key) => {
      this.cookies[key].touch = true;
      this.cookies[key].ttl = 0;
      this.cookies[key].value = '';
    });
  }

  public toArrayString(): Array<string> {
    return Object.keys(this.cookies).map((key) => {
      const value = (typeof this.cookies[key].value=='object')
        ?JSON.stringify(this.cookies[key].value)
        :this.cookies[key].value;
      return `${this.cookies[key].name}=${value}; ${this.cookies[key].httpOnly?'HttpOnly;':''} Path=/; Max-Age=${this.cookies[key].ttl}`;
    });
  }
}
