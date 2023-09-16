import {registerAs} from '@nestjs/config';

const DEFAULT_MAX_RESULTS = 100;

export default registerAs('results', () => ({
  defaultMaxResults: DEFAULT_MAX_RESULTS,
}));
