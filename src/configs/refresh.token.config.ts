import {registerAs} from '@nestjs/config';

export default registerAs('refresh-token', () => ({
  countUserRefreshTokens: 3,
}));
