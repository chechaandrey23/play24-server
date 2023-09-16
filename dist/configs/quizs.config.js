"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const DEFAULT_MAX_QUIZS = 100;
exports.default = (0, config_1.registerAs)('quizs', () => ({
    defaultMaxQuizs: DEFAULT_MAX_QUIZS,
}));
//# sourceMappingURL=quizs.config.js.map