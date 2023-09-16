"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const DEFAULT_MAX_QUESTIONS = 100;
exports.default = (0, config_1.registerAs)('questions', () => ({
    defaultMaxQuestions: DEFAULT_MAX_QUESTIONS,
}));
//# sourceMappingURL=questions.config.js.map