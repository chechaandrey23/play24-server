"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const jwt_access_strategy_1 = require("../auth/strategies/jwt.access.strategy");
const mediary_quizs_module_1 = require("../../mediaries/user/quizs/mediary.quizs.module");
const mediary_quizs_module_2 = require("../../mediaries/admin/quizs/mediary.quizs.module");
const mediary_results_module_1 = require("../../mediaries/admin/results/mediary.results.module");
const user_roles_module_1 = require("../../secondaries/user-roles/user.roles.module");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            user_roles_module_1.UserRolesModule,
            mediary_quizs_module_1.MediaryQuizsModule,
            mediary_quizs_module_2.MediaryQuizsModule,
            mediary_results_module_1.MediaryResultsModule,
        ],
        controllers: [
            admin_controller_1.AdminController
        ],
        providers: [
            admin_service_1.AdminService,
            jwt_access_strategy_1.JwtAccessStrategy,
        ],
        exports: [
            admin_service_1.AdminService
        ]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map