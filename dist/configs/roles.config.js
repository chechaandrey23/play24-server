"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_GUEST_VALUE = exports.ROLE_USER_VALUE = exports.ROLE_ADMIN_VALUE = void 0;
const config_1 = require("@nestjs/config");
const ROLE_ADMIN = 'ADMIN';
const ROLE_USER = 'USER';
const ROLE_GUEST = 'GUEST';
exports.ROLE_ADMIN_VALUE = 100;
exports.ROLE_USER_VALUE = 10;
exports.ROLE_GUEST_VALUE = 1;
const DEFAULT_MAX_ROLES = 100;
exports.default = (0, config_1.registerAs)('roles', () => ({
    roles: {
        [ROLE_ADMIN]: exports.ROLE_ADMIN_VALUE,
        [ROLE_USER]: exports.ROLE_USER_VALUE,
        [ROLE_GUEST]: exports.ROLE_GUEST_VALUE,
    },
    names: {
        admin: ROLE_ADMIN,
        user: ROLE_USER,
        guest: ROLE_GUEST,
    },
    defaultMaxRoles: DEFAULT_MAX_ROLES,
    defaultRoles: [exports.ROLE_GUEST_VALUE, exports.ROLE_USER_VALUE],
}));
//# sourceMappingURL=roles.config.js.map