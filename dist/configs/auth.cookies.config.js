"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth-cookies', () => ({
    names: [
        { name: 'AccessToken', httpOnly: true },
        { name: 'RefreshToken', httpOnly: true },
        'Roles',
    ],
}));
//# sourceMappingURL=auth.cookies.config.js.map