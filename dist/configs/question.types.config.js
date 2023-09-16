"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const DEFAULT_MAX_QUESTION_TYPES = 100;
exports.default = (0, config_1.registerAs)('question-types', () => ({
    defaultMaxQuestionTypes: DEFAULT_MAX_QUESTION_TYPES,
}));
//# sourceMappingURL=question.types.config.js.map