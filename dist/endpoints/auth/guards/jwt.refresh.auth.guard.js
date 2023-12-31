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
exports.JWTRefreshAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_cookies_service_1 = require("../../../secondaries/auth-cookies/auth.cookies.service");
let JWTRefreshAuthGuard = class JWTRefreshAuthGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor(authCookiesService) {
        super();
        this.authCookiesService = authCookiesService;
    }
    handleRequest(err, user, info, context, status) {
        if (err)
            throw new common_2.HttpException(err.message, err.status);
        if (!user) {
            this.authCookiesService.deleteAll();
            context.getResponse().setHeader('Set-Cookie', this.authCookiesService.toArrayString());
            throw new common_2.UnauthorizedException(info.message);
        }
        return user;
    }
};
JWTRefreshAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_cookies_service_1.AuthCookiesService)),
    __metadata("design:paramtypes", [auth_cookies_service_1.AuthCookiesService])
], JWTRefreshAuthGuard);
exports.JWTRefreshAuthGuard = JWTRefreshAuthGuard;
//# sourceMappingURL=jwt.refresh.auth.guard.js.map