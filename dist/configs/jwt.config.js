"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => ({
    jwtAccessSecret: 'JWT_ACCESS_SECRET',
    jwtAccessExpirationTime: 60,
    jwtRefreshSecret: 'JWT_REFRESH_SECRET',
    jwtRefreshExpirationTime: 24 * 60 * 60,
}));
//# sourceMappingURL=jwt.config.js.map