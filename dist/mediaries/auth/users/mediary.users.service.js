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
exports.MediaryUsersService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mixin_1 = require("../../../utils/mixin");
const handler_error_1 = require("../../../utils/handler.error");
const mongoose_session_1 = require("../../../utils/mongoose.session");
const mongoose_2 = require("@nestjs/mongoose");
const selected_roles_exception_1 = require("../../../utils/selected.roles.exception");
const configs_1 = require("../../../configs");
const hashs_service_1 = require("../../../secondaries/hashs/hashs.service");
const users_service_1 = require("../../../entries/users/users.service");
const roles_service_1 = require("../../../entries/roles/roles.service");
const passwords_service_1 = require("../../../entries/passwords/passwords.service");
let MediaryUsersService = class MediaryUsersService {
    constructor(connection, configService, hashsService, usersService, rolesService, passwordsService) {
        this.connection = connection;
        this.configService = configService;
        this.hashsService = hashsService;
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.passwordsService = passwordsService;
    }
    async checkUser(data) {
        try {
            return await this.withSession(null, async (session) => {
                const user = await this.usersService.getUser({
                    username: data.username,
                    session,
                    withRoles: true,
                });
                if (!user)
                    throw new common_2.NotAcceptableException(`User "${data.username}" NOT FOUND`);
                if (!await this.comparePassword({
                    userId: user.id, password: data.password, session: session
                })) {
                    throw new common_2.NotAcceptableException(`Password is INCORRECT`);
                }
                return user;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { username: data.username });
        }
    }
    async createUser(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const user = await this.usersService.createUser({
                    username: payload.username,
                    session,
                });
                const hash = await this.hashsService.toHash(hashs_service_1.HashsService['SALT_PASSWORD'], payload.password);
                const password = await this.passwordsService.createPassword({
                    userId: user.id,
                    hash: hash,
                    session,
                });
                const config = this.configService.get('roles');
                const selectedRoles = await this.rolesService.getAllRoles(Object.assign(Object.assign(Object.assign({ session }, (payload.roleIds ? { ids: payload.roleIds } : {})), ((payload.roles && !payload.roleIds) ? { roles: payload.roles } : {})), { limit: config.defaultMaxRoles, offset: 0 }));
                if (selectedRoles.length < 1) {
                    throw new selected_roles_exception_1.default('At least one role must be selected!!!');
                }
                await this.usersService.updateRolesSet({
                    session,
                    id: user.id,
                    roleIds: selectedRoles.map((entry) => entry.id),
                });
                await this.rolesService.updateAllUsersPush({
                    session,
                    ids: selectedRoles.map((entry) => entry.id),
                    userId: user.id,
                });
                await this.usersService.updatePasswordSet({
                    session,
                    id: user.id,
                    passwordId: password.id
                });
                return await this.usersService.getUser({
                    id: user.id,
                    withRoles: true,
                    session,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async comparePassword(data) {
        const password = await this.passwordsService.getPassword({
            session: data.session,
            userId: data.userId,
        });
        return await this.hashsService.compareHashSample(hashs_service_1.HashsService['SALT_PASSWORD'], password.hash, data.password);
    }
    async checkUserId(data) {
        try {
            return await this.withSession(null, async (session) => {
                const user = await this.usersService.getUser({
                    id: data.userId,
                    session,
                    withRoles: true,
                });
                if (!user)
                    throw new common_2.NotAcceptableException(`User with ID "${data.userId}" NOT FOUND`);
                return user;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: data.userId });
        }
    }
    async getUser(data) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.usersService.getUser({
                    id: data.id,
                    withRoles: true,
                    session,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: data.id });
        }
    }
    async getRoles(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('roles');
                return await this.rolesService.getAllRoles({
                    session,
                    limit: config.defaultMaxRoles,
                    offset: 0,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
};
MediaryUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        config_1.ConfigService,
        hashs_service_1.HashsService,
        users_service_1.UsersService,
        roles_service_1.RolesService,
        passwords_service_1.PasswordsService])
], MediaryUsersService);
exports.MediaryUsersService = MediaryUsersService;
(0, mixin_1.mixin)(MediaryUsersService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.users.service.js.map