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
exports.RefreshTokenHashsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const refresh_token_hash_model_1 = require("./refresh.token.hash.model");
const hashs_service_1 = require("../../secondaries/hashs/hashs.service");
let RefreshTokenHashsService = class RefreshTokenHashsService {
    constructor(connection, refreshTokenHashs, hashsService) {
        this.connection = connection;
        this.refreshTokenHashs = refreshTokenHashs;
        this.hashsService = hashsService;
    }
    async getRefreshTokenHash(payload) {
        return await this.refreshTokenHashs.findOne(Object.assign(Object.assign({}, (payload.id ? { _id: payload.id } : {})), (payload.refreshTokenId ? { refreshToken: payload.refreshTokenId } : {})), {}, {
            session: payload.session
        });
    }
    async createRefreshTokenHash(payload) {
        await this.checkDublicateRefreshTokenId({ refreshTokenId: payload.refreshTokenId, session: payload.session });
        const [refreshTokenHash] = await this.refreshTokenHashs.create([{
                hash: payload.token, refreshToken: payload.refreshTokenId
            }], { session: payload.session });
        return refreshTokenHash;
    }
    async checkDublicateRefreshTokenId(payload) {
        const res = await this.refreshTokenHashs.findOne({
            refreshToken: payload.refreshTokenId,
        }, null, {
            session: payload.session,
        });
        if (res) {
            throw new common_1.ConflictException(`Refresh Token MongoDBId "${payload.refreshTokenId}" already exists`);
        }
        return true;
    }
    async replaceRefreshTokenHash(payload) {
        await this.refreshTokenHashs.updateOne({ _id: payload.id, refreshToken: payload.refreshTokenId }, { hash: payload.token }, { session: payload.session });
        return await this.getRefreshTokenHash({
            id: payload.id,
            refreshTokenId: payload.refreshTokenId,
            session: payload.session,
        });
    }
    async eraseRefreshTokenHash(payload) {
        await this.refreshTokenHashs.updateOne({ _id: payload.id, refreshToken: payload.refreshTokenId }, { $unset: { hash: "" } }, { session: payload.session });
        return await this.getRefreshTokenHash({
            id: payload.id,
            refreshTokenId: payload.refreshTokenId,
            session: payload.session,
        });
    }
    async eraseAllRefreshTokenHashs(payload) {
        await this.refreshTokenHashs.updateMany({ _id: { $in: payload.ids }, refreshToken: { $in: payload.refreshTokenIds } }, { $unset: { hash: "" } }, { session: payload.session });
        return await this.refreshTokenHashs.find({
            _id: { $in: payload.ids },
            refreshToken: { $in: payload.refreshTokenIds },
        }, {}, { session: payload.session });
    }
};
RefreshTokenHashsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(refresh_token_hash_model_1.RefreshTokenHash.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object, hashs_service_1.HashsService])
], RefreshTokenHashsService);
exports.RefreshTokenHashsService = RefreshTokenHashsService;
//# sourceMappingURL=refresh.token.hashs.service.js.map