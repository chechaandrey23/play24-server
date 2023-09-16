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
exports.QuizsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const quiz_model_1 = require("./quiz.model");
const question_model_1 = require("../questions/question.model");
let QuizsService = class QuizsService {
    constructor(connection, quizs, questions) {
        this.connection = connection;
        this.quizs = quizs;
        this.questions = questions;
    }
    async getAllQuizs(payload) {
        return await this.quizs.find(Object.assign({}, (payload.hasOwnProperty('draft') ? { draft: payload.draft } : {})), {}, {
            session: payload.session,
            skip: payload.offset,
            limit: payload.limit,
            populate: [
                ...(payload.withAttempts ? [Object.assign(Object.assign({ path: 'attempts', select: {} }, (payload.attemptsWhere ? { match: payload.attemptsWhere } : {})), { options: { session: payload.session } })] : [])
            ]
        });
    }
    async getQuiz(payload) {
        return await this.quizs.findOne(Object.assign(Object.assign({ _id: payload.id }, (payload.hasOwnProperty('draft') ? { draft: payload.draft } : {})), (payload.where ? payload.where : {})), {}, {
            session: payload.session,
            populate: [
                ...(payload.withQuestions ? [Object.assign(Object.assign({ path: 'questions', select: {} }, (payload.questionsWhere ? { match: payload.questionsWhere } : {})), { options: {
                            session: payload.session,
                            populate: [
                                ...(payload.withQuestionType ? [{
                                        path: 'questionType',
                                        select: {},
                                        options: { session: payload.session }
                                    }] : []),
                                ...(payload.withResults ? [Object.assign(Object.assign({ path: 'results', select: {} }, (payload.resultsWhere ? { match: payload.resultsWhere } : {})), { options: { session: payload.session } })] : []),
                            ]
                        } })] : []),
                ...(payload.withAttempts ? [Object.assign(Object.assign({ path: 'attempts', select: {} }, (payload.attemptsWhere ? { match: payload.attemptsWhere } : {})), { options: {
                            session: payload.session,
                            populate: [
                                ...(payload.withAttemptUser ? [{
                                        path: 'user',
                                        select: {},
                                        options: { session: payload.session }
                                    }] : []),
                                ...(payload.withAttemptResults ? [Object.assign(Object.assign({ path: 'results', select: {} }, (payload.attemptResultsWhere ? { match: payload.attemptResultsWhere } : {})), { options: { session: payload.session } })] : []),
                            ],
                        } })] : [])
            ],
        });
    }
    async createQuiz(payload) {
        const [quiz] = await this.quizs.create([{
                quizname: payload.quizname,
                draft: payload.draft,
                author: payload.authorId,
                description: payload.description,
                duration: payload.duration,
                numberOfAttempts: payload.numberOfAttempts,
            }], { session: payload.session });
        return quiz;
    }
    async editQuizDraft(payload) {
        await this.quizs.updateOne({ _id: payload.id }, { draft: payload.draft }, { session: payload.session });
        return this.getQuiz({
            id: payload.id,
            session: payload.session
        });
    }
    async updateResultsPush(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $push: { results: payload.resultId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateAttemptsPush(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $push: { attempts: payload.attemptId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateCompletedUsersPush(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $push: { completedUsers: payload.userId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateCompletedUsersPull(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $pullAll: { completedUsers: [payload.userId] } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateQuestionsPush(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $push: { questions: payload.questionId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateQuestionsPull(payload) {
        const res = await this.quizs.updateOne({ _id: payload.id }, { $pullAll: { questions: [payload.questionId] } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async deleteOne(payload) {
        const res = await this.quizs.deleteOne({ _id: payload.id }, { session: payload.session });
        return res.deletedCount === 1;
    }
};
QuizsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(quiz_model_1.Quiz.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(2, (0, mongoose_2.InjectModel)(question_model_1.Question.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object, Object])
], QuizsService);
exports.QuizsService = QuizsService;
//# sourceMappingURL=quizs.service.js.map