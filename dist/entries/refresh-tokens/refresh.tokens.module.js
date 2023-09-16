"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const refresh_tokens_service_1 = require("./refresh.tokens.service");
const refresh_token_model_1 = require("./refresh.token.model");
let RefreshTokensModule = class RefreshTokensModule {
};
RefreshTokensModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: refresh_token_model_1.RefreshToken.name, schema: refresh_token_model_1.RefreshTokenSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
        ],
        controllers: [],
        providers: [
            refresh_tokens_service_1.RefreshTokensService
        ],
        exports: [
            refresh_tokens_service_1.RefreshTokensService
        ]
    })
], RefreshTokensModule);
exports.RefreshTokensModule = RefreshTokensModule;
//# sourceMappingURL=refresh.tokens.module.js.map