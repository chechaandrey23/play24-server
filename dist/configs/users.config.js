"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const roles_config_1 = require("./roles.config");
exports.default = (0, config_1.registerAs)('users', () => ({
    defaultUsers: [
        { username: 'admin', password: 'admin', roles: [roles_config_1.ROLE_ADMIN_VALUE, roles_config_1.ROLE_USER_VALUE, roles_config_1.ROLE_GUEST_VALUE] },
        { username: 'user1', password: 'password', roles: [roles_config_1.ROLE_USER_VALUE, roles_config_1.ROLE_GUEST_VALUE] },
        { username: 'user2', password: 'password', roles: [roles_config_1.ROLE_USER_VALUE, roles_config_1.ROLE_GUEST_VALUE] },
    ]
}));
//# sourceMappingURL=users.config.js.map