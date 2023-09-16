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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_cookies_service_1 = require("../../secondaries/auth-cookies/auth.cookies.service");
const mediary_users_service_1 = require("../../mediaries/auth/users/mediary.users.service");
const mediary_refresh_tokens_service_1 = require("../../mediaries/auth/refresh-tokens/mediary.refresh.tokens.service");
let AuthService = class AuthService {
    constructor(jwtService, configService, authCookiesService, mediaryUsersService, mediaryRefreshTokensService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.authCookiesService = authCookiesService;
        this.mediaryUsersService = mediaryUsersService;
        this.mediaryRefreshTokensService = mediaryRefreshTokensService;
    }
    async login(req, payload) {
        const user = await this.mediaryUsersService.getUser({ id: payload.userId });
        const res = await this.mainLogin(req, { user: user, userAgent: payload.userAgent, ip: payload.ip });
        req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
        return res;
    }
    async mainLogin(req, payload) {
        const accessToken = await this.generateAccessToken({
            id: payload.user.id,
            roles: payload.user.roles.map((entry) => (entry.role)),
        });
        const o = { refreshToken: null };
        const config = this.configService.get('jwt');
        await this.mediaryRefreshTokensService.createRefreshToken({
            userId: payload.user.id,
            refreshTokenLifetime: config.jwtRefreshExpirationTime,
            userAgent: payload.userAgent,
            ip: payload.ip,
        }, async (payload2) => {
            o.refreshToken = await this.generateRefreshToken(Object.assign({ id: payload.user.id, roles: payload.user.roles.map((entry) => (entry.role)) }, payload2));
            return o.refreshToken;
        });
        this.authCookiesService.add('AccessToken', accessToken, true, config.jwtAccessExpirationTime);
        this.authCookiesService.add('RefreshToken', o.refreshToken, true, config.jwtRefreshExpirationTime);
        return payload.user;
    }
    async logout(req, payload) {
        this.authCookiesService.deleteAll();
        if (payload.userId) {
            if (payload.fullExit) {
                await this.mediaryRefreshTokensService.deleteAllRefreshTokens({
                    userId: payload.userId
                });
            }
            else {
                await this.mediaryRefreshTokensService.deleteRefreshToken({
                    userId: payload.userId,
                    refreshTokenId: payload.refreshTokenId,
                });
            }
        }
        else {
            console.log('Silent LogOut!!!!!');
        }
        req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
    }
    async getRoles(req, payload) {
        return await this.mediaryUsersService.getRoles({});
    }
    async registration(req, payload) {
        const user = await this.mediaryUsersService.createUser({
            username: payload.username,
            password: payload.password,
            roleIds: payload.roles,
        });
        const res = await this.mainLogin(req, { user: user, userAgent: payload.userAgent, ip: payload.ip });
        req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
        return res;
    }
    async getUser(req, payload) {
        return await this.mediaryUsersService.getUser({ id: payload.userId });
    }
    async refresh(req, payload) {
        var _a;
        const user = await this.mediaryUsersService.getUser({ id: payload.userId });
        const reqUser = req.user;
        const accessToken = await this.generateAccessToken({
            id: user.id,
            roles: (user.roles.map((entry) => (entry.role))),
        });
        const refreshToken = await this.generateRefreshToken({
            id: user.id,
            refreshTokenId: payload.refreshTokenId,
            roles: (user.roles.map((entry) => (entry.role))),
        });
        try {
            const config = this.configService.get('jwt');
            await this.mediaryRefreshTokensService.refreshRefreshToken({
                refreshTokenId: payload.refreshTokenId,
                userId: user.id,
                newRefreshToken: refreshToken,
                cookieRefreshToken: (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.RefreshToken,
                refreshTokenLifetime: config.jwtRefreshExpirationTime,
                userAgent: payload.userAgent,
                ip: payload.ip,
            });
            this.authCookiesService.add('AccessToken', accessToken, true, config.jwtAccessExpirationTime);
            this.authCookiesService.add('RefreshToken', refreshToken, true, config.jwtRefreshExpirationTime);
            req.res.setHeader('Set-Cookie', this.authCookiesService.toArrayString());
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                this.authCookiesService.deleteAll();
            }
            throw e;
        }
        return user;
    }
    async generateAccessToken(payload) {
        const config = this.configService.get('jwt');
        return this.jwtService.sign(payload, {
            secret: config.jwtAccessSecret,
            expiresIn: config.jwtAccessExpirationTime * 1000,
        });
    }
    async generateRefreshToken(payload) {
        const config = this.configService.get('jwt');
        return this.jwtService.sign(payload, {
            secret: config.jwtRefreshSecret,
            expiresIn: config.jwtRefreshExpirationTime * 1000,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        auth_cookies_service_1.AuthCookiesService,
        mediary_users_service_1.MediaryUsersService,
        mediary_refresh_tokens_service_1.MediaryRefreshTokensService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map