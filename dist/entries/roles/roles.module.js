"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const roles_service_1 = require("./roles.service");
const role_model_1 = require("./role.model");
const user_model_1 = require("../users/user.model");
const user_roles_module_1 = require("../../secondaries/user-roles/user.roles.module");
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: role_model_1.Role.name, schema: role_model_1.RoleSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
            user_roles_module_1.UserRolesModule,
        ],
        controllers: [],
        providers: [
            roles_service_1.RolesService
        ],
        exports: [
            roles_service_1.RolesService
        ]
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map