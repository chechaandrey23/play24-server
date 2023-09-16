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
exports.MediaryResultsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mixin_1 = require("../../../utils/mixin");
const handler_error_1 = require("../../../utils/handler.error");
const mongoose_session_1 = require("../../../utils/mongoose.session");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../../configs");
const quizs_service_1 = require("../../../entries/quizs/quizs.service");
const results_service_1 = require("../../../entries/results/results.service");
const users_service_1 = require("../../../entries/users/users.service");
const attempts_service_1 = require("../../../entries/attempts/attempts.service");
let MediaryResultsService = class MediaryResultsService {
    constructor(connection, configService, usersService, quizsService, resultsService, attemptsService) {
        this.connection = connection;
        this.configService = configService;
        this.usersService = usersService;
        this.quizsService = quizsService;
        this.resultsService = resultsService;
        this.attemptsService = attemptsService;
    }
    async getResultsForQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    draft: false,
                    withAttempts: true,
                    attemptsWhere: {
                        quiz: payload.quizId,
                        irRelevant: false,
                    },
                    withAttemptUser: true,
                    withAttemptResults: true,
                    attemptResultsWhere: {
                        quiz: payload.quizId,
                    },
                    withQuestions: true,
                    questionsWhere: { draft: false },
                    withQuestionType: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async resetResultQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                await this.attemptsService.editIrRelevant({
                    session,
                    id: payload.attemptId,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    irRelevant: true,
                });
                return this.attemptsService.getAttempt({
                    session,
                    id: payload.attemptId,
                    quizId: payload.quizId,
                    userId: payload.userId,
                    irRelevant: true,
                    withResults: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
};
MediaryResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        config_1.ConfigService,
        users_service_1.UsersService,
        quizs_service_1.QuizsService,
        results_service_1.ResultsService,
        attempts_service_1.AttemptsService])
], MediaryResultsService);
exports.MediaryResultsService = MediaryResultsService;
(0, mixin_1.mixin)(MediaryResultsService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.results.service.js.map