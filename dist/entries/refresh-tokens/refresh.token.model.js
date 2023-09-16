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
exports.RefreshTokenSchema = exports.RefreshToken = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../users/user.model");
const refresh_token_hash_model_1 = require("../refresh-token-hashs/refresh.token.hash.model");
let RefreshToken = class RefreshToken {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "dateEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_model_1.User)
], RefreshToken.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'RefreshTokenHash' }),
    __metadata("design:type", refresh_token_hash_model_1.RefreshTokenHash)
], RefreshToken.prototype, "refreshTokenHash", void 0);
RefreshToken = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, selectPopulatedPaths: false })
], RefreshToken);
exports.RefreshToken = RefreshToken;
exports.RefreshTokenSchema = mongoose_1.SchemaFactory.createForClass(RefreshToken);
//# sourceMappingURL=refresh.token.model.js.map