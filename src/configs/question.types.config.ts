import {registerAs} from '@nestjs/config';

const DEFAULT_MAX_QUESTION_TYPES = 100;

export default registerAs('question-types', () => ({
  defaultMaxQuestionTypes: DEFAULT_MAX_QUESTION_TYPES,
}));
