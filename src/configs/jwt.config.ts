import {registerAs} from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwtAccessSecret: 'JWT_ACCESS_SECRET',
  jwtAccessExpirationTime: 60,
  jwtRefreshSecret: 'JWT_REFRESH_SECRET',
  jwtRefreshExpirationTime: 24*60*60,
}));
