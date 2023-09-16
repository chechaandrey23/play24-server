"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const SALT_PASSWORD = 'PASSWORD';
const SALT_REFRESH_TOKEN = 'REFRESH_TOKEN';
exports.default = (0, config_1.registerAs)('salts', () => ({
    salts: {
        [SALT_PASSWORD]: {
            rounds: 10,
            secretStart: 'pass',
            secretEnd: 'word',
        },
        [SALT_REFRESH_TOKEN]: {
            rounds: 10,
            secretStart: 'refresh',
            secretEnd: 'token',
        },
    },
    names: {
        password: SALT_PASSWORD,
        refreshToken: SALT_REFRESH_TOKEN,
    },
}));
//# sourceMappingURL=salts.config.js.map