"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const passwords_service_1 = require("./passwords.service");
const password_model_1 = require("./password.model");
const hashs_module_1 = require("../../secondaries/hashs/hashs.module");
let PasswordsModule = class PasswordsModule {
};
PasswordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: password_model_1.Password.name, schema: password_model_1.PasswordSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
            hashs_module_1.HashsModule
        ],
        controllers: [],
        providers: [
            passwords_service_1.PasswordsService
        ],
        exports: [
            passwords_service_1.PasswordsService
        ]
    })
], PasswordsModule);
exports.PasswordsModule = PasswordsModule;
//# sourceMappingURL=passwords.module.js.map