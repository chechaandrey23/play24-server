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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const jwt_access_auth_guard_1 = require("./guards/jwt.access.auth.guard");
const jwt_refresh_auth_guard_1 = require("./guards/jwt.refresh.auth.guard");
const local_auth_guard_1 = require("./guards/local.auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async logIn(req) {
        return await this.authService.login(req, {
            userId: req.user.id,
            userAgent: req.headers['user-agent'],
            ip: req.clientIp,
        });
    }
    async logOut(req, logoutDTO) {
        var _a, _b;
        return await this.authService.logout(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            refreshTokenId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.refreshTokenId,
            fullExit: logoutDTO.fullExit,
        });
    }
    async getRoles(req) {
        return await this.authService.getRoles(req, {});
    }
    async getUser(req) {
        var _a;
        return await this.authService.getUser(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async registration(req, registrationDTO) {
        return await this.authService.registration(req, {
            username: registrationDTO.username,
            password: registrationDTO.password,
            roles: registrationDTO.roles,
            userAgent: req.headers['user-agent'],
            ip: req.clientIp,
        });
    }
    async refresh(req) {
        const user = req.user;
        return await this.authService.refresh(req, {
            userId: user.id,
            refreshTokenId: user.refreshTokenId,
            userAgent: req.headers['user-agent'],
            ip: req.clientIp,
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JWTRefreshAuthGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.LogoutDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)('/roles'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JWTAccessAuthGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/registration'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.RegistrationDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JWTRefreshAuthGuard),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('auth/api'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map