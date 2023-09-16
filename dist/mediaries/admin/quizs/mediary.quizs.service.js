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
exports.MediaryQuizsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mixin_1 = require("../../../utils/mixin");
const handler_error_1 = require("../../../utils/handler.error");
const mongoose_session_1 = require("../../../utils/mongoose.session");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../../configs");
const quizs_service_1 = require("../../../entries/quizs/quizs.service");
const questions_service_1 = require("../../../entries/questions/questions.service");
const question_types_service_1 = require("../../../entries/question-types/question.types.service");
const results_service_1 = require("../../../entries/results/results.service");
const users_service_1 = require("../../../entries/users/users.service");
const question_types_1 = require("../../../entries/question-types/question.types");
let MediaryQuizsService = class MediaryQuizsService {
    constructor(connection, configService, usersService, quizsService, questionsService, questionTypesService, resultsService) {
        this.connection = connection;
        this.configService = configService;
        this.usersService = usersService;
        this.quizsService = quizsService;
        this.questionsService = questionsService;
        this.questionTypesService = questionTypesService;
        this.resultsService = resultsService;
    }
    async getQuizs(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('quizs');
                return await this.quizsService.getAllQuizs({
                    session,
                    limit: config.defaultMaxQuizs,
                    offset: 0,
                    withAttempts: true,
                    attemptsWhere: {
                        irRelevant: false,
                    },
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async getQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    withAttempts: true,
                    attemptsWhere: {
                        irRelevant: false,
                    },
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async getFullQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    withQuestions: true,
                    withQuestionType: true,
                    withAttempts: true,
                    attemptsWhere: {
                        irRelevant: false,
                    },
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async createQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const quiz = await this.quizsService.createQuiz({
                    session,
                    quizname: payload.quizname,
                    draft: payload.draft,
                    authorId: payload.authorId,
                    description: payload.description,
                    duration: payload.duration,
                    numberOfAttempts: payload.numberOfAttempts,
                });
                return await this.quizsService.getQuiz({
                    session,
                    id: quiz.id,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async deleteQuiz(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const quiz = await this.quizsService.getQuiz({
                    session,
                    id: payload.id,
                    withQuestions: true,
                });
                if (!quiz) {
                    throw new common_2.ConflictException(`Quiz with quizId "${payload.id}" - NOT FOUND`);
                }
                if (quiz.author != payload.authorId) {
                    throw new common_2.ConflictException(`You cannot delete the quiz '${payload.authorId}', because you are not the author and creator`);
                }
                if (payload.deleteWithQuestions) {
                    await this.questionsService.deleteMany({
                        session,
                        ids: quiz.questions.map((entry) => entry.id),
                    });
                    await this.questionTypesService.updateAllManyQuestionsPull({
                        session,
                        questionIds: quiz.questions.map((entry) => entry.id),
                    });
                }
                await this.quizsService.deleteOne({
                    session,
                    id: payload.id,
                });
                await this.usersService.updateAllCompletedQuizsPull({
                    session,
                    quizId: payload.id,
                });
                return quiz;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: payload.id });
        }
    }
    async editQuizDraft(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.quizsService.editQuizDraft({
                    session,
                    id: payload.id,
                    draft: payload.draft,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: payload.id });
        }
    }
    async getQuizAllQuestions(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('questions');
                return await this.questionsService.getQuestions({
                    session,
                    limit: config.defaultMaxQuestions,
                    offset: 0,
                    quizId: payload.quizId,
                    withQuestionType: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async getQuizQuestion(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.questionsService.getQuestion({
                    session,
                    id: payload.questionId,
                    quizId: payload.quizId,
                    withQuestionType: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async createQuestion(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const questionType = await this.questionTypesService.getQuestionType({
                    id: payload.questionTypeId,
                    session,
                });
                const countQuestions = await this.questionsService.countQuestions({
                    session,
                    quizId: payload.quizId,
                });
                const question = await this.questionsService.createQuestion(Object.assign(Object.assign(Object.assign(Object.assign({ session, quizId: payload.quizId, questionTypeId: payload.questionTypeId, question: payload.question }, ((questionType.type === question_types_1.QUESTION_MATCH_ANSWER_OPTIONS || questionType.type === question_types_1.QUESTION_MULTI_MATCH_ANSWER_OPTIONS) ? { answerOptions: payload.answerOptions } : {})), ((questionType.type === question_types_1.QUESTION_MULTI_MATCH_ANSWER_OPTIONS) ? { answer: payload.answerArray } : {})), ((questionType.type === question_types_1.QUESTION_MATCH_ANSWER || questionType.type === question_types_1.QUESTION_MATCH_ANSWER_OPTIONS) ? { answer: payload.answer } : {})), { order: countQuestions + 1, draft: payload.draft, authorId: payload.authorId }));
                await this.questionTypesService.updateQuestionsPush({
                    session,
                    id: payload.questionTypeId,
                    questionId: question.id,
                });
                await this.quizsService.updateQuestionsPush({
                    session,
                    questionId: question.id,
                    id: payload.quizId,
                });
                return await this.questionsService.getQuestion({
                    session,
                    id: question.id,
                    quizId: payload.quizId,
                    withQuestionType: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async editQuestionDraft(payload) {
        try {
            return await this.withSession(null, async (session) => {
                return await this.questionsService.editQuestionDraft({
                    session,
                    id: payload.id,
                    draft: payload.draft,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: payload.id });
        }
    }
    async deleteQuestion(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const question = await this.questionsService.getQuestion({
                    session,
                    id: payload.id,
                    withQuestionType: true,
                });
                if (!question) {
                    throw new common_2.ConflictException(`Question with questionId "${payload.id}" - NOT FOUND`);
                }
                if (question.author != payload.authorId) {
                    throw new common_2.ConflictException(`You cannot delete the question '${payload.authorId}', because you are not the author and creator`);
                }
                await this.questionsService.deleteOne({
                    session,
                    id: payload.id,
                });
                await this.questionTypesService.updateQuestionsPull({
                    session,
                    id: question.questionType.id,
                    questionId: payload.id,
                });
                await this.quizsService.updateQuestionsPull({
                    session,
                    id: question.quiz,
                    questionId: payload.id,
                });
                return question;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, { id: payload.id });
        }
    }
    async orderQuestions(payload) {
        try {
            return await this.withSession(null, async (session) => {
                await this.questionsService.editOrderNew({
                    session,
                    quizId: payload.quizId,
                    orderQuestions: payload.orderQuestions,
                });
                return await this.questionsService.getQuestions({
                    session,
                    withQuestionType: true,
                    ids: payload.orderQuestions.map((item) => item.id),
                    quizId: payload.quizId,
                    limit: payload.orderQuestions.length,
                    offset: 0,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async getAllQuestionTypes(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('question-types');
                return await this.questionTypesService.getAllQuestionTypes({
                    session,
                    offset: 0,
                    limit: config.defaultMaxQuestionTypes,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
};
MediaryQuizsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        config_1.ConfigService,
        users_service_1.UsersService,
        quizs_service_1.QuizsService,
        questions_service_1.QuestionsService,
        question_types_service_1.QuestionTypesService,
        results_service_1.ResultsService])
], MediaryQuizsService);
exports.MediaryQuizsService = MediaryQuizsService;
(0, mixin_1.mixin)(MediaryQuizsService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.quizs.service.js.map