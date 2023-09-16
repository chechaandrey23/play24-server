"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaryRefreshTokensModule = void 0;
const common_1 = require("@nestjs/common");
const mediary_refresh_tokens_service_1 = require("./mediary.refresh.tokens.service");
const hashs_module_1 = require("../../../secondaries/hashs/hashs.module");
const users_module_1 = require("../../../entries/users/users.module");
const refresh_tokens_module_1 = require("../../../entries/refresh-tokens/refresh.tokens.module");
const refresh_token_hashs_module_1 = require("../../../entries/refresh-token-hashs/refresh.token.hashs.module");
let MediaryRefreshTokensModule = class MediaryRefreshTokensModule {
};
MediaryRefreshTokensModule = __decorate([
    (0, common_1.Module)({
        imports: [
            hashs_module_1.HashsModule,
            users_module_1.UsersModule,
            refresh_tokens_module_1.RefreshTokensModule,
            refresh_token_hashs_module_1.RefreshTokenHashsModule,
        ],
        controllers: [],
        providers: [
            mediary_refresh_tokens_service_1.MediaryRefreshTokensService,
        ],
        exports: [
            mediary_refresh_tokens_service_1.MediaryRefreshTokensService,
        ]
    })
], MediaryRefreshTokensModule);
exports.MediaryRefreshTokensModule = MediaryRefreshTokensModule;
//# sourceMappingURL=mediary.refresh.tokens.module.js.map