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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const jwt_access_auth_guard_1 = require("../auth/guards/jwt.access.auth.guard");
const user_role_guard_1 = require("../auth/guards/user.role.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getQuizs(req) {
        var _a;
        return await this.userService.getQuizs(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async getQuiz(req, quizDTO) {
        var _a;
        return await this.userService.getQuiz(req, {
            quizId: quizDTO.quizId,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async getQuizWithAttempt(req, quizAttemptDTO) {
        var _a;
        return await this.userService.getQuizWithAttempt(req, {
            quizId: quizAttemptDTO.quizId,
            attemptId: quizAttemptDTO.attemptId,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async createAttempt(req, quizDTO) {
        var _a;
        return await this.userService.createAttempt(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizDTO.quizId,
        });
    }
    async getQuizAllAttempts(req, quizDTO) {
        var _a;
        return await this.userService.getQuizAllAttempts(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizDTO.quizId,
        });
    }
    async getQuizAllQuestions(req, quizAttemptDTO) {
        var _a;
        return await this.userService.getQuizAllQuestions(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizAttemptDTO.quizId,
            attemptId: quizAttemptDTO.attemptId,
        });
    }
    async getQuizQuestion(req, quizAttemptQuestionDTO) {
        var _a;
        return await this.userService.getQuizQuestion(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizAttemptQuestionDTO.quizId,
            attemptId: quizAttemptQuestionDTO.attemptId,
            questionId: quizAttemptQuestionDTO.questionId,
        });
    }
    async setQuizQuestion(req, quizAttemptQuestionDTO, answerDTO) {
        var _a;
        return await this.userService.setQuizQuestion(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizAttemptQuestionDTO.quizId,
            questionId: quizAttemptQuestionDTO.questionId,
            attemptId: quizAttemptQuestionDTO.attemptId,
            answer: answerDTO.answer,
            answerArray: answerDTO.answerArray,
        });
    }
    async finishQuiz(req, quizAttemptDTO) {
        var _a;
        return await this.userService.finishQuizAttempt(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizAttemptDTO.quizId,
            attemptId: quizAttemptDTO.attemptId,
        });
    }
    async getQuizAllQuestions2(req, quizAttemptDTO) {
        var _a;
        return await this.userService.getFullQuiz(req, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            quizId: quizAttemptDTO.quizId,
            attemptId: quizAttemptDTO.attemptId,
        });
    }
};
__decorate([
    (0, common_1.Get)('/quizs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizs", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuiz", null);
__decorate([
    (0, common_1.Get)('/quiz-with-attempt/:quizId/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizWithAttempt", null);
__decorate([
    (0, common_1.Post)('/quiz/:quizId/create-attempt'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAttempt", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/attempts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizAllAttempts", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/questions/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizAllQuestions", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/question/:questionId/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptQuestionDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizQuestion", null);
__decorate([
    (0, common_1.Post)('/quiz/:quizId/question/:questionId/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptQuestionDTO, user_dto_1.AnswerDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setQuizQuestion", null);
__decorate([
    (0, common_1.Post)('/quiz/:quizId/finish/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "finishQuiz", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/questions2/:attemptId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.QuizAttemptDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizAllQuestions2", null);
UserController = __decorate([
    (0, common_1.UseGuards)(user_role_guard_1.UserRoleGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JWTAccessAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('user/api'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map