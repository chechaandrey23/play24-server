"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const attempts_service_1 = require("./attempts.service");
const attempt_model_1 = require("./attempt.model");
let AttemptsModule = class AttemptsModule {
};
AttemptsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: attempt_model_1.Attempt.name, schema: attempt_model_1.AttemptSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
        ],
        controllers: [],
        providers: [
            attempts_service_1.AttemptsService
        ],
        exports: [
            attempts_service_1.AttemptsService
        ]
    })
], AttemptsModule);
exports.AttemptsModule = AttemptsModule;
//# sourceMappingURL=attempts.module.js.map