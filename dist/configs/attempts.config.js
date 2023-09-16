"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const DEFAULT_MAX_ATTEMPTS = 100;
exports.default = (0, config_1.registerAs)('attempts', () => ({
    defaultMaxAttempts: DEFAULT_MAX_ATTEMPTS,
}));
//# sourceMappingURL=attempts.config.js.map