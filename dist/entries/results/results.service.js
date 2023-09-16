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
exports.ResultsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const result_model_1 = require("./result.model");
let ResultsService = class ResultsService {
    constructor(connection, results) {
        this.connection = connection;
        this.results = results;
    }
    async getQuestionsForUser(payload) {
        return await this.results.find({
            user: payload.userId,
            quiz: payload.quizId,
            question: { $in: payload.questionIds },
        }, {}, {
            session: payload.session,
        });
    }
    async getResult(payload) {
        return await this.results.find({
            user: payload.userId,
            quiz: payload.quizId,
        }, {}, {
            session: payload.session,
            limit: payload.limit,
            offset: payload.offset,
        });
    }
    async getAllResults(payload) {
        return await this.results.find(Object.assign(Object.assign({}, (payload.userId ? { user: payload.userId } : {})), { quiz: payload.quizId }), {}, {
            session: payload.session,
            limit: payload.limit,
            offset: payload.offset,
        });
    }
    async setAnswer(payload) {
        const [result] = await this.results.create([{
                user: payload.userId,
                quiz: payload.quizId,
                question: payload.questionId,
                questionType: payload.questionTypeId,
                attempt: payload.attemptId,
                userAnswer: payload.answer,
            }], { session: payload.session });
        return result;
    }
    async getResultOne(payload) {
        return await this.results.findOne({
            user: payload.userId,
            quiz: payload.quizId,
            question: payload.questionId,
            questionType: payload.questionTypeId,
            attempt: payload.attemptId,
        }, {}, {
            session: payload.session,
        });
    }
    async editUserAnswer(payload) {
        const res = await this.results.updateOne({ _id: payload.id }, { userAnswer: payload.answer }, { session: payload.session });
        return res.modifiedCount === 1;
    }
};
ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(result_model_1.Result.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], ResultsService);
exports.ResultsService = ResultsService;
//# sourceMappingURL=results.service.js.map