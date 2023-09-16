import {registerAs} from '@nestjs/config';

const DEFAULT_MAX_QUESTIONS = 100;

export default registerAs('questions', () => ({
  defaultMaxQuestions: DEFAULT_MAX_QUESTIONS,
}));
