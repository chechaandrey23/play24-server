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
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const user_model_1 = require("./user.model");
const role_model_1 = require("../roles/role.model");
const user_roles_service_1 = require("../../secondaries/user-roles/user.roles.service");
const dublicate_username_exception_1 = require("../../utils/dublicate.username.exception");
let UsersService = class UsersService {
    constructor(connection, users, roles, userRolesService) {
        this.connection = connection;
        this.users = users;
        this.roles = roles;
        this.userRolesService = userRolesService;
    }
    async getUser(payload) {
        if (!payload.id && !payload.username) {
            throw new common_1.ConflictException('One of the parameters must be specified: username or userId');
        }
        return await this.users.findOne(Object.assign(Object.assign({}, (payload.id ? { _id: payload.id } : {})), (payload.username ? { username: payload.username } : {})), {}, {
            session: payload.session,
            populate: [
                ...(payload.withRoles ? [{
                        path: 'roles',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
            ]
        });
    }
    async createUser(payload) {
        await this.checkDublicateUsername({ username: payload.username, session: payload.session });
        const [user] = await this.users.create([{
                username: payload.username,
            }], { session: payload.session });
        return user;
    }
    async checkDublicateUsername(payload) {
        const res = await this.users.findOne({
            username: payload.username,
        }, null, {
            session: payload.session,
        });
        if (res) {
            throw new dublicate_username_exception_1.default(`User with username "${payload.username}" already exists`);
        }
        return true;
    }
    async updateRolesSet(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $set: { roles: payload.roleIds } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updatePasswordSet(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $set: { password: payload.passwordId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateRefreshTokensPush(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $push: { refreshTokens: payload.refreshTokenId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateResultsPush(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $push: { results: payload.resultId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateAttemptsPush(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $push: { attempts: payload.attemptId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateCompletedQuizsPush(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $push: { completedQuizs: payload.quizId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateRefreshTokensPull(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $pullAll: { resreshTokens: [payload.refreshTokenId] } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateRefreshTokensPullAll(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $pullAll: { resreshTokens: payload.refreshTokenIds } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateCompletedQuizsPull(payload) {
        const res = await this.users.updateOne({ _id: payload.id }, { $pullAll: { completedQuizs: [payload.quizId] } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateAllCompletedQuizsPull(payload) {
        const count = await this.users.countDocuments({ completedQuizs: { $all: [payload.quizId] } }, { session: payload.session });
        const res = await this.users.updateMany({ completedQuizs: { $all: [payload.quizId] } }, { $pullAll: { completedQuizs: [payload.quizId] } }, { session: payload.session });
        return res.modifiedCount === count;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(user_model_1.User.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(2, (0, mongoose_2.InjectModel)(role_model_1.Role.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object, Object, user_roles_service_1.UserRolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map