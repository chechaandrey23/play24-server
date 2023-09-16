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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const jwt_access_auth_guard_1 = require("../auth/guards/jwt.access.auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin.role.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllQuizs(req) {
        return await this.adminService.getAllQuizs(req, {});
    }
    async getQuiz(req, quizDTO) {
        return await this.adminService.getQuiz(req, {
            quizId: quizDTO.quizId,
        });
    }
    async getResultsForQuiz(req, resultsForQuiz) {
        return await this.adminService.getResultsForQuiz(req, {
            quizId: resultsForQuiz.quizId,
        });
    }
    async resetResultQuiz(req, resetResultQuizAttempt) {
        return await this.adminService.resetResultQuiz(req, {
            quizId: resetResultQuizAttempt.quizId,
            userId: resetResultQuizAttempt.userId,
            attemptId: resetResultQuizAttempt.attemptId,
        });
    }
    async getQuizAllQuestions(req, quizAllQuestionsDTO) {
        return await this.adminService.getQuizAllQuestions(req, {
            quizId: quizAllQuestionsDTO.quizId,
        });
    }
    async getQuizAllQuestions2(req, quizAllQuestionsDTO) {
        return await this.adminService.getFullQuiz(req, {
            quizId: quizAllQuestionsDTO.quizId,
        });
    }
    async getQuizQuestion(req, quizQuestionDTO) {
        return await this.adminService.getQuizQuestion(req, {
            quizId: quizQuestionDTO.quizId,
            questionId: quizQuestionDTO.questionId,
        });
    }
    async createQuiz(req, createQuizDTO) {
        var _a;
        return await this.adminService.createQuiz(req, {
            quizname: createQuizDTO.quizname,
            draft: createQuizDTO.draft,
            authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            description: createQuizDTO.description,
            duration: createQuizDTO.duration,
            numberOfAttempts: createQuizDTO.numberOfAttempts,
        });
    }
    async deleteQuiz(req, deleteQuizDTO) {
        var _a;
        return await this.adminService.deleteQuiz(req, {
            id: deleteQuizDTO.id,
            authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async editQuizDraft(req, editQuizDraftDTO) {
        return await this.adminService.editQuizDraft(req, {
            id: editQuizDraftDTO.id,
            draft: editQuizDraftDTO.draft,
        });
    }
    async createQuestion(req, createQuestionDTO) {
        var _a;
        return await this.adminService.createQuestion(req, {
            quizId: createQuestionDTO.quizId,
            questionTypeId: createQuestionDTO.questionTypeId,
            question: createQuestionDTO.question,
            answerOptions: createQuestionDTO.answerOptions,
            answer: createQuestionDTO.answer,
            answerArray: createQuestionDTO.answerArray,
            draft: createQuestionDTO.draft,
            authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async editQuestionDraft(req, editQuestionDraftDTO) {
        return await this.adminService.editQuestionDraft(req, {
            id: editQuestionDraftDTO.id,
            draft: editQuestionDraftDTO.draft,
        });
    }
    async deleteQuestion(req, deleteQuestionDTO) {
        var _a;
        return await this.adminService.deleteQuestion(req, {
            id: deleteQuestionDTO.id,
            authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    async orderQuestions(req, orderQuestionsDTO) {
        return await this.adminService.orderQuestions(req, {
            quizId: orderQuestionsDTO.quizId,
            orderQuestions: orderQuestionsDTO.orderQuestions,
        });
    }
    async getAllQuestionTypes(req) {
        return await this.adminService.getAllQuestionTypes(req, {});
    }
};
__decorate([
    (0, common_1.Get)('/quizs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllQuizs", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.QuizDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuiz", null);
__decorate([
    (0, common_1.Get)('/result-quiz/:quizId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.ResultsForQuizDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getResultsForQuiz", null);
__decorate([
    (0, common_1.Post)('/reset-result-quiz'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.ResetResultQuizAttemptDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetResultQuiz", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/questions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.QuizAllQuestionsDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuizAllQuestions", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/questions2'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.QuizAllQuestionsDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuizAllQuestions2", null);
__decorate([
    (0, common_1.Get)('/quiz/:quizId/question/:questionId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.QuizQuestionDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getQuizQuestion", null);
__decorate([
    (0, common_1.Post)('/quiz-create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.CreateQuizDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)('/quiz-delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.DeleteQuizDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteQuiz", null);
__decorate([
    (0, common_1.Post)('/quiz-edit/draft'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.EditQuizDraftDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "editQuizDraft", null);
__decorate([
    (0, common_1.Post)('/question-create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.CreateQuestionDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Post)('/question-edit/draft'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.EditQuestionDraftDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "editQuestionDraft", null);
__decorate([
    (0, common_1.Post)('/question-delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.DeleteQuestionDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)('/order-questions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.OrderQuestionsDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "orderQuestions", null);
__decorate([
    (0, common_1.Get)('/question-types'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllQuestionTypes", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JWTAccessAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('admin/api'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map