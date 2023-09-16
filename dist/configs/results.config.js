"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const DEFAULT_MAX_RESULTS = 100;
exports.default = (0, config_1.registerAs)('results', () => ({
    defaultMaxResults: DEFAULT_MAX_RESULTS,
}));
//# sourceMappingURL=results.config.js.map