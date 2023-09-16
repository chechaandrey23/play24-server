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
exports.MediaryRefreshTokensService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mixin_1 = require("../../../utils/mixin");
const handler_error_1 = require("../../../utils/handler.error");
const mongoose_session_1 = require("../../../utils/mongoose.session");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../../configs");
const hashs_service_1 = require("../../../secondaries/hashs/hashs.service");
const users_service_1 = require("../../../entries/users/users.service");
const refresh_tokens_service_1 = require("../../../entries/refresh-tokens/refresh.tokens.service");
const refresh_token_hashs_service_1 = require("../../../entries/refresh-token-hashs/refresh.token.hashs.service");
let MediaryRefreshTokensService = class MediaryRefreshTokensService {
    constructor(connection, configService, hashsService, usersService, refreshTokensService, refreshTokenHashsService) {
        this.connection = connection;
        this.configService = configService;
        this.hashsService = hashsService;
        this.usersService = usersService;
        this.refreshTokensService = refreshTokensService;
        this.refreshTokenHashsService = refreshTokenHashsService;
    }
    async checkRefreshToken(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const res = await this.refreshTokensService.getRefreshToken({
                    session,
                    id: payload.refreshTokenId,
                    userId: payload.userId,
                    where: { $or: [{ dateEnd: { $exists: false } }, { dateEnd: null }, { dateEnd: { $lt: new Date() } }] },
                });
                return res;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async createRefreshToken(payload, fn) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('refresh-token');
                const countRefreshTokens = await this.refreshTokensService.countRefreshTokens({
                    session,
                    userId: payload.userId,
                });
                if (config.countUserRefreshTokens > countRefreshTokens) {
                    const refreshToken = await this.refreshTokensService.createRefreshToken({
                        session,
                        userId: payload.userId,
                        dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
                        ip: payload.ip,
                        userAgent: payload.userAgent,
                    });
                    const refreshTokenString = await fn({ refreshTokenId: refreshToken.id });
                    const hash = await this.hashsService.toHash(hashs_service_1.HashsService['SALT_REFRESH_TOKEN'], refreshTokenString);
                    const refreshTokenHash = await this.refreshTokenHashsService.createRefreshTokenHash({
                        session,
                        refreshTokenId: refreshToken.id,
                        token: hash,
                    });
                    await this.refreshTokensService.updateRefreshTokenHashSet({
                        session,
                        id: refreshToken.id,
                        refreshTokenHashId: refreshTokenHash.id,
                    });
                    await this.usersService.updateRefreshTokensPush({
                        id: payload.userId,
                        refreshTokenId: refreshToken.id,
                        session,
                    });
                    return await this.refreshTokensService.getRefreshToken({
                        id: refreshToken.id,
                        userId: payload.userId,
                        withRefreshTokenHash: false,
                        session,
                    });
                }
                else {
                    const refreshToken = await this.refreshTokensService.replaceExpiredRefreshToken({
                        session,
                        userId: payload.userId,
                        dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
                        ip: payload.ip,
                        userAgent: payload.userAgent,
                    });
                    const refreshTokenString = await fn({ refreshTokenId: refreshToken.id });
                    const hash = await this.hashsService.toHash(hashs_service_1.HashsService['SALT_REFRESH_TOKEN'], refreshTokenString);
                    const refreshTokenHash = await this.refreshTokenHashsService.replaceRefreshTokenHash({
                        session,
                        id: refreshToken.refreshTokenHash.id,
                        refreshTokenId: refreshToken.id,
                        token: hash,
                    });
                    return refreshToken;
                }
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async deleteAllRefreshTokens({ userId }) {
        try {
            return await this.withSession(null, async (session) => {
                const refreshTokens = await this.refreshTokensService.eraseAllRefreshTokens({
                    userId: userId,
                    session,
                });
                const refreshTokenHashs = await this.refreshTokenHashsService.eraseAllRefreshTokenHashs({
                    ids: refreshTokens.map((entry) => (entry.refreshTokenHash.id)),
                    refreshTokenIds: refreshTokens.map((entry) => (entry.id)),
                    session,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async deleteRefreshToken({ userId, refreshTokenId }) {
        try {
            return await this.withSession(null, async (session) => {
                const refreshToken = await this.refreshTokensService.eraseRefreshToken({
                    id: refreshTokenId,
                    userId: userId,
                    session,
                });
                const refreshTokenHash = await this.refreshTokenHashsService.eraseRefreshTokenHash({
                    id: refreshToken.refreshTokenHash.id,
                    refreshTokenId: refreshToken.id,
                    session,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async refreshRefreshToken(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const refreshToken = await this.refreshTokensService.refreshRefreshToken({
                    session,
                    id: payload.refreshTokenId,
                    userId: payload.userId,
                    dateEnd: new Date(Date.now() + payload.refreshTokenLifetime * 1000),
                    ip: payload.ip,
                    userAgent: payload.userAgent,
                });
                if (!await this.compareRefreshTokenHash({
                    refreshTokenId: refreshToken.id,
                    token: payload.cookieRefreshToken,
                    session: session,
                })) {
                    throw new common_2.NotAcceptableException(`Refresh Token is INCORRECT`);
                }
                const hash = await this.hashsService.toHash(hashs_service_1.HashsService['SALT_REFRESH_TOKEN'], payload.newRefreshToken);
                const refreshTokenHash = await this.refreshTokenHashsService.replaceRefreshTokenHash({
                    session,
                    id: refreshToken.refreshTokenHash.id,
                    refreshTokenId: refreshToken.id,
                    token: hash,
                });
                return refreshToken;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async compareRefreshTokenHash(payload) {
        const refreshTokenHash = await this.refreshTokenHashsService.getRefreshTokenHash({
            refreshTokenId: payload.refreshTokenId,
            session: payload.session,
        });
        return await this.hashsService.compareHashSample(hashs_service_1.HashsService['SALT_REFRESH_TOKEN'], refreshTokenHash.hash, payload.token);
    }
};
MediaryRefreshTokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        config_1.ConfigService,
        hashs_service_1.HashsService,
        users_service_1.UsersService,
        refresh_tokens_service_1.RefreshTokensService,
        refresh_token_hashs_service_1.RefreshTokenHashsService])
], MediaryRefreshTokensService);
exports.MediaryRefreshTokensService = MediaryRefreshTokensService;
(0, mixin_1.mixin)(MediaryRefreshTokensService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.refresh.tokens.service.js.map