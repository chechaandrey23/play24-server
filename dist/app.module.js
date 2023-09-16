"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("./configs/jwt.config");
const roles_config_1 = require("./configs/roles.config");
const users_config_1 = require("./configs/users.config");
const salts_config_1 = require("./configs/salts.config");
const auth_cookies_config_1 = require("./configs/auth.cookies.config");
const refresh_token_config_1 = require("./configs/refresh.token.config");
const mongo_config_1 = require("./configs/mongo.config");
const quizs_config_1 = require("./configs/quizs.config");
const questions_config_1 = require("./configs/questions.config");
const attempts_config_1 = require("./configs/attempts.config");
const question_types_config_1 = require("./configs/question.types.config");
const final_module_1 = require("./endpoints/final/final.module");
const auth_module_1 = require("./endpoints/auth/auth.module");
const user_module_1 = require("./endpoints/user/user.module");
const admin_module_1 = require("./endpoints/admin/admin.module");
const init_module_1 = require("./endpoints/init/init.module");
const configs_1 = require("./configs");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [
                    jwt_config_1.default,
                    roles_config_1.default,
                    users_config_1.default,
                    salts_config_1.default,
                    auth_cookies_config_1.default,
                    refresh_token_config_1.default,
                    mongo_config_1.default,
                    quizs_config_1.default,
                    questions_config_1.default,
                    attempts_config_1.default,
                    question_types_config_1.default,
                ],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                connectionName: configs_1.MONGO_FIRST_CONNECT_NAME,
                useFactory: (configService) => ({
                    uri: configService.get('mongo.uri'),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            init_module_1.InitModule,
            final_module_1.FinalModule,
        ],
        controllers: [],
        providers: [],
        exports: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map