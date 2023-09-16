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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_quizs_service_1 = require("../../mediaries/user/quizs/mediary.quizs.service");
const mediary_quizs_service_2 = require("../../mediaries/admin/quizs/mediary.quizs.service");
const mediary_results_service_1 = require("../../mediaries/admin/results/mediary.results.service");
let AdminService = class AdminService {
    constructor(configService, mediaryUserQuizsService, mediaryQuizsService, mediaryResultsService) {
        this.configService = configService;
        this.mediaryUserQuizsService = mediaryUserQuizsService;
        this.mediaryQuizsService = mediaryQuizsService;
        this.mediaryResultsService = mediaryResultsService;
    }
    async getAllQuizs(req, payload) {
        return await this.mediaryQuizsService.getQuizs({});
    }
    async getQuiz(req, payload) {
        return await this.mediaryQuizsService.getQuiz({
            quizId: payload.quizId,
        });
    }
    async getResultsForQuiz(req, payload) {
        return await this.mediaryResultsService.getResultsForQuiz({
            quizId: payload.quizId,
        });
    }
    async resetResultQuiz(req, payload) {
        return await this.mediaryResultsService.resetResultQuiz({
            quizId: payload.quizId,
            userId: payload.userId,
            attemptId: payload.attemptId,
        });
    }
    async getQuizAllQuestions(req, payload) {
        return await this.mediaryQuizsService.getQuizAllQuestions({
            quizId: payload.quizId,
        });
    }
    async getFullQuiz(req, payload) {
        return await this.mediaryQuizsService.getFullQuiz({
            quizId: payload.quizId,
        });
    }
    async getQuizQuestion(req, payload) {
        return await this.mediaryQuizsService.getQuizQuestion({
            quizId: payload.quizId,
            questionId: payload.questionId,
        });
    }
    async createQuiz(req, payload) {
        return await this.mediaryQuizsService.createQuiz({
            quizname: payload.quizname,
            draft: payload.draft,
            authorId: payload.authorId,
            description: payload.description,
            duration: payload.duration,
            numberOfAttempts: payload.numberOfAttempts,
        });
    }
    async deleteQuiz(req, payload) {
        return await this.mediaryQuizsService.deleteQuiz({
            id: payload.id,
            deleteWithQuestions: true,
            authorId: payload.authorId,
        });
    }
    async editQuizDraft(req, payload) {
        return await this.mediaryQuizsService.editQuizDraft({
            id: payload.id,
            draft: payload.draft,
        });
    }
    async createQuestion(req, payload) {
        return await this.mediaryQuizsService.createQuestion({
            quizId: payload.quizId,
            questionTypeId: payload.questionTypeId,
            question: payload.question,
            answerOptions: payload.answerOptions,
            answer: payload.answer,
            answerArray: payload.answerArray,
            draft: payload.draft,
            authorId: payload.authorId,
        });
    }
    async editQuestionDraft(req, payload) {
        return await this.mediaryQuizsService.editQuestionDraft({
            id: payload.id,
            draft: payload.draft,
        });
    }
    async deleteQuestion(req, payload) {
        return await this.mediaryQuizsService.deleteQuestion({
            id: payload.id,
            authorId: payload.authorId,
        });
    }
    async orderQuestions(req, payload) {
        return await this.mediaryQuizsService.orderQuestions({
            quizId: payload.quizId,
            orderQuestions: payload.orderQuestions,
        });
    }
    async getAllQuestionTypes(req, payload) {
        return await this.mediaryQuizsService.getAllQuestionTypes({});
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mediary_quizs_service_1.MediaryQuizsService,
        mediary_quizs_service_2.MediaryQuizsService,
        mediary_results_service_1.MediaryResultsService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map