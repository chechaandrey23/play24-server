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
exports.MediaryInitsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mixin_1 = require("../../../utils/mixin");
const handler_error_1 = require("../../../utils/handler.error");
const mongoose_session_1 = require("../../../utils/mongoose.session");
const user_roles_service_1 = require("../../../secondaries/user-roles/user.roles.service");
const quizs_service_1 = require("../../../entries/quizs/quizs.service");
const questions_service_1 = require("../../../entries/questions/questions.service");
const question_types_service_1 = require("../../../entries/question-types/question.types.service");
const roles_service_1 = require("../../../entries/roles/roles.service");
const users_service_1 = require("../../../entries/users/users.service");
const question_types_1 = require("../../../entries/question-types/question.types");
const configs_1 = require("../../../configs");
let MediaryInitsService = class MediaryInitsService {
    constructor(connection, configService, usersService, quizsService, questionsService, questionTypesService, rolesService, userRolesService) {
        this.connection = connection;
        this.configService = configService;
        this.usersService = usersService;
        this.quizsService = quizsService;
        this.questionsService = questionsService;
        this.questionTypesService = questionTypesService;
        this.rolesService = rolesService;
        this.userRolesService = userRolesService;
    }
    async checkAndCreateRoles(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('roles');
                const roles = await this.rolesService.getAllRoles({
                    session,
                    limit: config.defaultMaxRoles,
                    offset: 0,
                });
                const newRoles = [];
                const defaultRoleNames = config.names;
                await Object.keys(defaultRoleNames).forEach(async (roleKey) => {
                    const roleName = defaultRoleNames[roleKey];
                    const role = await this.userRolesService.getRole(roleName);
                    const currentRoles = roles.filter((entry) => {
                        return entry.role == role;
                    });
                    if (currentRoles.length == 0) {
                        newRoles.push({ role: role, title: roleName, description: roleName });
                    }
                });
                if (newRoles.length > 1) {
                    return await this.rolesService.bulKCreateRoles({
                        session,
                        roles: newRoles,
                    });
                }
                return roles;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async checkAndCreateQuestionTypes(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('question-types');
                const questionTypes = await this.questionTypesService.getAllQuestionTypes({
                    session,
                    limit: config.defaultMaxQuestionTypes,
                    offset: 0,
                });
                const newQuestionTypes = [];
                const defaultQuestionTypes = [
                    question_types_1.QUESTION_RANDOM_ANSWER,
                    question_types_1.QUESTION_MATCH_ANSWER,
                    question_types_1.QUESTION_MATCH_ANSWER_OPTIONS,
                    question_types_1.QUESTION_MULTI_MATCH_ANSWER_OPTIONS,
                ];
                defaultQuestionTypes.forEach((type) => {
                    const currentQuestionTypes = questionTypes.filter((entry) => {
                        return entry.type == type;
                    });
                    if (currentQuestionTypes.length == 0) {
                        newQuestionTypes.push({ type: type, title: 'type->' + type, description: 'type->' + type });
                    }
                });
                if (newQuestionTypes.length > 1) {
                    return await this.questionTypesService.bulKCreateQuestionTypes({
                        session,
                        questionTypes: newQuestionTypes,
                    });
                }
                return questionTypes;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
};
MediaryInitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        config_1.ConfigService,
        users_service_1.UsersService,
        quizs_service_1.QuizsService,
        questions_service_1.QuestionsService,
        question_types_service_1.QuestionTypesService,
        roles_service_1.RolesService,
        user_roles_service_1.UserRolesService])
], MediaryInitsService);
exports.MediaryInitsService = MediaryInitsService;
(0, mixin_1.mixin)(MediaryInitsService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.inits.service.js.map