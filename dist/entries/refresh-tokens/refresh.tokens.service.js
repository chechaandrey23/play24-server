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
exports.RefreshTokensService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const refresh_token_model_1 = require("./refresh.token.model");
let RefreshTokensService = class RefreshTokensService {
    constructor(connection, refreshTokens) {
        this.connection = connection;
        this.refreshTokens = refreshTokens;
    }
    async getRefreshToken(payload) {
        return await this.refreshTokens.findOne(Object.assign(Object.assign({}, (payload.id ? { _id: payload.id } : {})), (payload.userId ? { user: payload.userId } : {})), {}, {
            session: payload.session,
            populate: [
                ...(payload.withRefreshTokenHash ? [{
                        path: 'refreshTokenHash',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
            ]
        });
    }
    async countRefreshTokens(payload) {
        return await this.refreshTokens.countDocuments(Object.assign({}, (payload.userId ? { user: payload.userId } : {})), { session: payload.session });
    }
    async createRefreshToken(payload) {
        const [refreshToken] = await this.refreshTokens.create([{
                user: payload.userId,
                ip: payload.ip || '',
                userAgent: payload.userAgent || '',
                dateEnd: new Date(payload.dateEnd),
            }], { session: payload.session });
        return refreshToken;
    }
    async replaceExpiredRefreshToken(payload) {
        const refreshToken = await this.refreshTokens.findOne({ $and: [
                { user: payload.userId },
                { $or: [{ dateEnd: { $exists: false } }, { dateEnd: null }, { dateEnd: { $lt: new Date() } }] }
            ] }, null, { session: payload.session });
        if (!refreshToken) {
            throw new common_1.ConflictException(`No slot for refresh token at update refresh token`);
        }
        else {
            await this.refreshTokens.updateOne({
                _id: refreshToken.id,
                user: payload.userId
            }, {
                ip: payload.ip || '',
                userAgent: payload.userAgent || '',
                dateEnd: new Date(payload.dateEnd),
            }, { session: payload.session });
            return await this.getRefreshToken({
                id: refreshToken.id,
                userId: payload.userId,
                withRefreshTokenHash: true,
                session: payload.session,
            });
        }
    }
    async eraseAllRefreshTokens(payload) {
        const currentRefreshTokens = await this.refreshTokens.find({
            user: payload.userId,
        }, ['id'], {
            session: payload.session
        });
        await this.refreshTokens.updateMany({ _id: { $in: currentRefreshTokens.map((entry) => entry.id) } }, { $unset: { ip: "", userAgent: "", dateEnd: "" } }, { session: payload.session });
        return await this.refreshTokens.find({
            user: payload.userId,
        }, {}, {
            session: payload.session,
            populate: [{
                    path: 'refreshTokenHash',
                    select: '-hash',
                    options: { session: payload.session }
                }]
        });
    }
    async eraseRefreshToken(payload) {
        await this.refreshTokens.updateOne({ _id: payload.id, user: payload.userId }, { $unset: { ip: "", userAgent: "", dateEnd: "" } }, { session: payload.session });
        return await this.getRefreshToken({
            id: payload.id,
            userId: payload.userId,
            withRefreshTokenHash: true,
            session: payload.session,
        });
    }
    async refreshRefreshToken(payload) {
        await this.refreshTokens.updateOne({
            _id: payload.id,
            user: payload.userId,
            $and: [
                { dateEnd: { $exists: false } },
                { dateEnd: null },
                { dateEnd: { $lt: new Date() } },
            ]
        }, {
            ip: payload.ip || '',
            userAgent: payload.userAgent || '',
            dateEnd: new Date(payload.dateEnd),
        }, { session: payload.session });
        return await this.getRefreshToken({
            id: payload.id,
            userId: payload.userId,
            withRefreshTokenHash: true,
            session: payload.session,
        });
    }
    async updateRefreshTokenHashSet(payload) {
        const res = await this.refreshTokens.updateOne({ _id: payload.id }, { $set: { refreshTokenHash: payload.refreshTokenHashId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
};
RefreshTokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(refresh_token_model_1.RefreshToken.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], RefreshTokensService);
exports.RefreshTokensService = RefreshTokensService;
//# sourceMappingURL=refresh.tokens.service.js.map