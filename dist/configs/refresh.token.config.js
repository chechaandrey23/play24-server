"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('refresh-token', () => ({
    countUserRefreshTokens: 3,
}));
//# sourceMappingURL=refresh.token.config.js.map