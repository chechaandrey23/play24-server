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
exports.RefreshTokenHashSchema = exports.RefreshTokenHash = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const refresh_token_model_1 = require("../refresh-tokens/refresh.token.model");
let RefreshTokenHash = class RefreshTokenHash {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], RefreshTokenHash.prototype, "hash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'RefreshToken' }),
    __metadata("design:type", refresh_token_model_1.RefreshToken)
], RefreshTokenHash.prototype, "refreshToken", void 0);
RefreshTokenHash = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, selectPopulatedPaths: false })
], RefreshTokenHash);
exports.RefreshTokenHash = RefreshTokenHash;
exports.RefreshTokenHashSchema = mongoose_1.SchemaFactory.createForClass(RefreshTokenHash);
//# sourceMappingURL=refresh.token.hash.model.js.map