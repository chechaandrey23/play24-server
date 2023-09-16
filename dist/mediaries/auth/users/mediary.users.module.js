"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaryUsersModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_users_service_1 = require("./mediary.users.service");
const hashs_module_1 = require("../../../secondaries/hashs/hashs.module");
const users_module_1 = require("../../../entries/users/users.module");
const roles_module_1 = require("../../../entries/roles/roles.module");
const passwords_module_1 = require("../../../entries/passwords/passwords.module");
let MediaryUsersModule = class MediaryUsersModule {
};
MediaryUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            hashs_module_1.HashsModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            passwords_module_1.PasswordsModule,
        ],
        controllers: [],
        providers: [
            mediary_users_service_1.MediaryUsersService,
        ],
        exports: [
            mediary_users_service_1.MediaryUsersService,
        ]
    })
], MediaryUsersModule);
exports.MediaryUsersModule = MediaryUsersModule;
//# sourceMappingURL=mediary.users.module.js.map