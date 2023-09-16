"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaryInitsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_inits_service_1 = require("./mediary.inits.service");
const quizs_module_1 = require("../../../entries/quizs/quizs.module");
const questions_module_1 = require("../../../entries/questions/questions.module");
const question_types_module_1 = require("../../../entries/question-types/question.types.module");
const users_module_1 = require("../../../entries/users/users.module");
const roles_module_1 = require("../../../entries/roles/roles.module");
const user_roles_module_1 = require("../../../secondaries/user-roles/user.roles.module");
let MediaryInitsModule = class MediaryInitsModule {
};
MediaryInitsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            quizs_module_1.QuizsModule,
            questions_module_1.QuestionsModule,
            question_types_module_1.QuestionTypesModule,
            user_roles_module_1.UserRolesModule,
        ],
        controllers: [],
        providers: [
            mediary_inits_service_1.MediaryInitsService,
        ],
        exports: [
            mediary_inits_service_1.MediaryInitsService,
        ]
    })
], MediaryInitsModule);
exports.MediaryInitsModule = MediaryInitsModule;
//# sourceMappingURL=mediary.inits.module.js.map