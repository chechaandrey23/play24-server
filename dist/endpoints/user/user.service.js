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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_quizs_service_1 = require("../../mediaries/user/quizs/mediary.quizs.service");
let UserService = class UserService {
    constructor(configService, mediaryQuizsService) {
        this.configService = configService;
        this.mediaryQuizsService = mediaryQuizsService;
    }
    async getQuizs(req, payload) {
        return await this.mediaryQuizsService.getQuizs({
            userId: payload.userId,
        });
    }
    async getQuiz(req, payload) {
        return await this.mediaryQuizsService.getQuiz({
            quizId: payload.quizId,
            userId: payload.userId,
        });
    }
    async getQuizWithAttempt(req, payload) {
        return await this.mediaryQuizsService.getQuiz({
            quizId: payload.quizId,
            userId: payload.userId,
            attemptId: payload.attemptId,
        });
    }
    async createAttempt(req, payload) {
        return await this.mediaryQuizsService.createAttempt({
            userId: payload.userId,
            quizId: payload.quizId,
        });
    }
    async getQuizAllAttempts(req, payload) {
        return await this.mediaryQuizsService.getQuizAllAttempts({
            userId: payload.userId,
            quizId: payload.quizId,
        });
    }
    async getQuizAllQuestions(req, payload) {
        return await this.mediaryQuizsService.getQuizAllQuestions({
            userId: payload.userId,
            quizId: payload.quizId,
            attemptId: payload.attemptId,
        });
    }
    async getQuizQuestion(req, payload) {
        return await this.mediaryQuizsService.getQuizQuestion({
            userId: payload.userId,
            quizId: payload.quizId,
            questionId: payload.questionId,
            attemptId: payload.attemptId,
        });
    }
    async setQuizQuestion(req, payload) {
        return await this.mediaryQuizsService.setQuizQuestion({
            userId: payload.userId,
            quizId: payload.quizId,
            questionId: payload.questionId,
            attemptId: payload.attemptId,
            answer: payload.answer,
            answerArray: payload.answerArray,
        });
    }
    async finishQuizAttempt(req, payload) {
        return await this.mediaryQuizsService.finishQuizAttempt({
            userId: payload.userId,
            quizId: payload.quizId,
            attemptId: payload.attemptId,
        });
    }
    async getFullQuiz(req, payload) {
        return await this.mediaryQuizsService.getFullQuiz({
            quizId: payload.quizId,
            userId: payload.userId,
            attemptId: payload.attemptId,
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mediary_quizs_service_1.MediaryQuizsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map