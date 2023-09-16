import {registerAs} from '@nestjs/config';

const DEFAULT_MAX_ATTEMPTS = 100;

export default registerAs('attempts', () => ({
  defaultMaxAttempts: DEFAULT_MAX_ATTEMPTS,
}));
