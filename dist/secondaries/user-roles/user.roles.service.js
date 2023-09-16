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
var UserRolesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let UserRolesService = UserRolesService_1 = class UserRolesService {
    constructor(configService) {
        this.configService = configService;
        const roles = this.configService.get('roles.names');
        Object.keys(roles).forEach((key) => {
            Object.defineProperty(UserRolesService_1, 'ROLE_' + roles[key], { value: roles[key], writable: false });
        });
    }
    async getRole(nameRole) {
        const roles = this.configService.get('roles.roles');
        if (!roles.hasOwnProperty(nameRole)) {
            throw new common_2.NotImplementedException(`Role with name "${nameRole}" does not exist`);
        }
        return roles[nameRole];
    }
};
UserRolesService = UserRolesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UserRolesService);
exports.UserRolesService = UserRolesService;
//# sourceMappingURL=user.roles.service.js.map