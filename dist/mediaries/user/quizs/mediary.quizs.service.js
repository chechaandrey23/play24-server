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
const attempts_service_1 = require("../../../entries/attempts/attempts.service");
const question_types_1 = require("../../../entries/question-types/question.types");
let MediaryQuizsService = class MediaryQuizsService {
    constructor(connection, configService, usersService, quizsService, questionsService, questionTypesService, resultsService, attemptsService) {
        this.connection = connection;
        this.configService = configService;
        this.usersService = usersService;
        this.quizsService = quizsService;
        this.questionsService = questionsService;
        this.questionTypesService = questionTypesService;
        this.resultsService = resultsService;
        this.attemptsService = attemptsService;
    }
    async getQuizs(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('quizs');
                return await this.quizsService.getAllQuizs({
                    session,
                    withAttempts: true,
                    attemptsWhere: {
                        user: payload.userId,
                        irRelevant: false,
                    },
                    draft: false,
                    limit: config.defaultMaxQuizs,
                    offset: 0,
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
                const quiz = await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    withAttempts: true,
                    attemptsWhere: Object.assign(Object.assign({}, (payload.attemptId ? { _id: payload.attemptId } : {})), { user: payload.userId, irRelevant: false }),
                });
                if (quiz.draft == true) {
                    throw new common_2.ConflictException(`You can't take an unpublished quiz (QuizId: ${payload.quizId})!!!`);
                }
                return quiz;
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async createAttempt(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const quiz = await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    withAttempts: true,
                    attemptsWhere: {
                        user: payload.userId,
                        irRelevant: false,
                    },
                    draft: false,
                });
                const numberOfAttempts = quiz.attempts.length;
                if (quiz.numberOfAttempts == 0 || (quiz.numberOfAttempts != 0 && quiz.numberOfAttempts > numberOfAttempts)) {
                    const attempt = await this.attemptsService.createAttempt({
                        quizId: payload.quizId,
                        userId: payload.userId,
                        dateStart: new Date(),
                        irRelevant: false,
                    });
                    await this.quizsService.updateAttemptsPush({
                        session,
                        id: payload.quizId,
                        attemptId: attempt.id,
                    });
                    await this.usersService.updateAttemptsPush({
                        session,
                        id: payload.userId,
                        attemptId: attempt.id,
                    });
                    return attempt;
                }
                else {
                    throw new common_2.ConflictException(`The number of attempts to pass the quiz exceeds the allowed value "${numberOfAttempts}"`);
                }
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async getQuizAllAttempts(payload) {
        try {
            return await this.withSession(null, async (session) => {
                const config = this.configService.get('attempts');
                return await this.attemptsService.getAllAttempts({
                    session,
                    quizId: payload.quizId,
                    userId: payload.userId,
                    limit: config.defaultMaxAttempts,
                    offset: 0,
                    irRelevant: false,
                    withQuiz: true,
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async checkExpiredAttempt(payload) {
        const attempt = await this.attemptsService.getAttempt({
            session: payload.session,
            id: payload.attemptId,
            userId: payload.userId,
            quizId: payload.quizId,
            withQuiz: true,
        });
        if (!attempt) {
            throw new common_2.ConflictException(`attempt attemptId (${payload.attemptId}) is missing or not available for user userId (${payload.userId})`);
        }
        const quiz = attempt.quiz;
        if (attempt.irRelevant) {
            throw new common_2.ConflictException(`You can't pass the quiz (${payload.userId}) on an irrelevant attempt (${payload.attemptId})`);
        }
        else if (quiz.draft == true) {
            throw new common_2.ConflictException(`You can't take an unpublished quiz quizID: ${payload.quizId}`);
        }
        else if (attempt.dateEnd && Date.now() <= new Date(attempt.dateEnd).getTime()) {
            throw new common_2.ConflictException(`You cannot pass a quiz that has already been completed quizID: ${payload.quizId}; attemptId: ${payload.attemptId}`);
        }
        else if (quiz.duration != 0 && new Date(attempt.dateStart).getTime() + quiz.duration < Date.now()) {
            throw new common_2.ConflictException(`Time expired for the current quiz quizID: ${payload.quizId}`);
        }
        return attempt;
    }
    async getQuizAllQuestions(payload) {
        try {
            return await this.withSession(null, async (session) => {
                await this.checkExpiredAttempt({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                });
                const config = this.configService.get('questions');
                return await this.questionsService.getQuestions({
                    session,
                    limit: config.defaultMaxQuestions,
                    offset: 0,
                    quizId: payload.quizId,
                    withResults: true,
                    resultsWhere: {
                        user: payload.userId, quiz: payload.quizId, attempt: payload.attemptId
                    }
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
                await this.checkExpiredAttempt({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                });
                return await this.questionsService.getQuestion({
                    session,
                    id: payload.questionId,
                    quizId: payload.quizId,
                    withQuestionType: true,
                    withQuiz: true,
                    withResults: true,
                    resultsWhere: {
                        user: payload.userId, quiz: payload.quizId, question: payload.questionId, attempt: payload.attemptId
                    },
                    withQuizAttempts: true,
                    quizAttemptsWhere: {
                        _id: payload.attemptId,
                    },
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async setQuizQuestion(payload) {
        try {
            return await this.withSession(null, async (session) => {
                await this.checkExpiredAttempt({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                });
                const question = await this.questionsService.getQuestion({
                    session,
                    id: payload.questionId,
                    quizId: payload.quizId,
                    withQuestionType: true,
                });
                const questionType = question.questionType.type;
                let answer = null;
                if (questionType === question_types_1.QUESTION_RANDOM_ANSWER || questionType === question_types_1.QUESTION_MATCH_ANSWER || questionType === question_types_1.QUESTION_MATCH_ANSWER_OPTIONS) {
                    answer = payload.answer;
                }
                else if (questionType === question_types_1.QUESTION_MULTI_MATCH_ANSWER_OPTIONS) {
                    answer = payload.answerArray;
                }
                else {
                    throw new common_2.ConflictException(`Question with questionId "${payload.questionId}" with questionType "${questionType}" - NOT FOUND!`);
                }
                const res = await this.resultsService.getResultOne({
                    session,
                    userId: payload.userId,
                    questionId: payload.questionId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                    questionTypeId: question.questionType.id,
                });
                if (!res) {
                    const result = await this.resultsService.setAnswer({
                        session,
                        userId: payload.userId,
                        questionId: payload.questionId,
                        quizId: payload.quizId,
                        attemptId: payload.attemptId,
                        questionTypeId: question.questionType.id,
                        answer: answer,
                    });
                    await this.usersService.updateResultsPush({
                        session,
                        id: payload.userId,
                        resultId: result.id,
                    });
                    await this.quizsService.updateResultsPush({
                        session,
                        id: payload.quizId,
                        resultId: result.id,
                    });
                    await this.attemptsService.updateResultsPush({
                        session,
                        id: payload.attemptId,
                        resultId: result.id,
                    });
                    await this.questionsService.updateResultsPush({
                        session,
                        id: payload.questionId,
                        resultId: result.id,
                    });
                    await this.questionTypesService.updateResultsPush({
                        session,
                        id: question.questionType.id,
                        resultId: result.id,
                    });
                }
                else {
                    await this.resultsService.editUserAnswer({
                        session,
                        id: res.id,
                        answer: answer,
                    });
                }
                return await this.questionsService.getQuestion({
                    session,
                    id: payload.questionId,
                    quizId: payload.quizId,
                    withQuestionType: true,
                    withResults: true,
                    resultsWhere: { user: payload.userId, quiz: payload.quizId, question: payload.questionId, attempt: payload.attemptId }
                });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e, {});
        }
    }
    async finishQuizAttempt(payload) {
        try {
            return await this.withSession(null, async (session) => {
                await this.checkExpiredAttempt({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                });
                await this.attemptsService.editDateEnd({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    id: payload.attemptId,
                    dateEnd: new Date(Date.now()),
                });
                return await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    withAttempts: true,
                    attemptsWhere: {
                        user: payload.userId,
                        attempt: payload.attemptId,
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
                await this.checkExpiredAttempt({
                    session,
                    userId: payload.userId,
                    quizId: payload.quizId,
                    attemptId: payload.attemptId,
                });
                return await this.quizsService.getQuiz({
                    session,
                    id: payload.quizId,
                    draft: false,
                    withAttempts: true,
                    attemptsWhere: Object.assign(Object.assign({}, (payload.attemptId ? { _id: payload.attemptId } : {})), { user: payload.userId, quiz: payload.quizId, irRelevant: false }),
                    withQuestions: true,
                    questionsWhere: { draft: false },
                    withQuestionType: true,
                    withResults: true,
                    resultsWhere: {
                        user: payload.userId, quiz: payload.quizId, attempt: payload.attemptId
                    },
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
        results_service_1.ResultsService,
        attempts_service_1.AttemptsService])
], MediaryQuizsService);
exports.MediaryQuizsService = MediaryQuizsService;
(0, mixin_1.mixin)(MediaryQuizsService, [mongoose_session_1.MongooseSession]);
//# sourceMappingURL=mediary.quizs.service.js.map