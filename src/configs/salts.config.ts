import {registerAs} from '@nestjs/config';

const SALT_PASSWORD = 'PASSWORD';
const SALT_REFRESH_TOKEN = 'REFRESH_TOKEN';

export interface SaltInterface {
  rounds: number;
  secretStart: string;
  secretEnd: string;
}
export type SaltsInterface = {[key: string]: SaltInterface};

export default registerAs('salts', () => ({
  salts: {
    [SALT_PASSWORD]: {
      rounds: 10,
      secretStart: 'pass',
      secretEnd: 'word',
    } as SaltInterface,
    [SALT_REFRESH_TOKEN]: {
      rounds: 10,
      secretStart: 'refresh',
      secretEnd: 'token',
    } as SaltInterface,
  } as SaltsInterface,
  names: {
    password: SALT_PASSWORD,
    refreshToken: SALT_REFRESH_TOKEN,
  },
}));
