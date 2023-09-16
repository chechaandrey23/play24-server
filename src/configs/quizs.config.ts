import {registerAs} from '@nestjs/config';

const DEFAULT_MAX_QUIZS = 100;

export default registerAs('quizs', () => ({
  defaultMaxQuizs: DEFAULT_MAX_QUIZS,
}));
