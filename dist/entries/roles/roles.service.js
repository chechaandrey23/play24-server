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
exports.RolesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const role_model_1 = require("./role.model");
const user_roles_service_1 = require("../../secondaries/user-roles/user.roles.service");
const dublicate_role_exception_1 = require("../../utils/dublicate.role.exception");
let RolesService = class RolesService {
    constructor(connection, roles, userRolesService) {
        this.connection = connection;
        this.roles = roles;
        this.userRolesService = userRolesService;
    }
    async getAllRoles(payload) {
        return await this.roles.find(Object.assign(Object.assign({}, (payload.ids ? { _id: { $in: payload.ids } } : {})), (payload.roles ? { role: { $in: payload.roles } } : {})), {}, {
            session: payload.session,
            skip: payload.offset,
            limit: payload.limit,
        });
    }
    async updateAllUsersPush(payload) {
        const res = await this.roles.updateMany({
            _id: { $in: payload.ids }
        }, {
            $push: { users: payload.userId }
        }, {
            session: payload.session,
        });
        return res.modifiedCount === payload.ids.length;
    }
    async bulKCreateRoles(payload) {
        await this.checkDublicateRoles({ roles: payload.roles.map((item) => item.role) });
        return await this.roles.create(payload.roles, { session: payload.session });
    }
    async checkDublicateRoles(payload) {
        const res = await this.roles.find({
            role: { $in: payload.roles }
        }, null, {
            session: payload.session,
        });
        if (res.length > 0) {
            throw new dublicate_role_exception_1.default(`Role with role "${res[0].role}" already exists`);
        }
        return true;
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(role_model_1.Role.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object, user_roles_service_1.UserRolesService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map