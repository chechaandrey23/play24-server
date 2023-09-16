"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_roles_service_1 = require("../../../secondaries/user-roles/user.roles.service");
let AdminRoleGuard = class AdminRoleGuard {
    constructor(reflector, userRolesService) {
        this.reflector = reflector;
        this.userRolesService = userRolesService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.roles.includes(await this.userRolesService.getRole(user_roles_service_1.UserRolesService['ROLE_ADMIN']));
    }
};
AdminRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(user_roles_service_1.UserRolesService)),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_roles_service_1.UserRolesService])
], AdminRoleGuard);
exports.AdminRoleGuard = AdminRoleGuard;
//# sourceMappingURL=admin.role.guard.js.map