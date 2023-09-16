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
exports.AttemptsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const attempt_model_1 = require("./attempt.model");
let AttemptsService = class AttemptsService {
    constructor(connection, attempts) {
        this.connection = connection;
        this.attempts = attempts;
    }
    async createAttempt(payload) {
        const [attempt] = await this.attempts.create([{
                quiz: payload.quizId,
                user: payload.userId,
                dateStart: payload.dateStart,
                irRelevant: payload.irRelevant,
            }], { session: payload.session });
        return attempt;
    }
    async getAllAttempts(payload) {
        return await this.attempts.find(Object.assign(Object.assign({}, (payload.userId ? { user: payload.userId } : {})), { quiz: payload.quizId, irRelevant: payload.irRelevant }), {}, {
            session: payload.session,
            skip: payload.offset,
            limit: payload.limit,
            populate: [
                ...(payload.withQuiz ? [{
                        path: 'quiz',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
                ...(payload.withUser ? [{
                        path: 'user',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
                ...(payload.withResults ? [{
                        path: 'results',
                        select: {},
                        options: { session: payload.session }
                    }] : [])
            ],
        });
    }
    async getAttempt(payload) {
        return await this.attempts.findOne({
            _id: payload.id,
            user: payload.userId,
            quiz: payload.quizId,
            irRelevant: payload.irRelevant || false,
        }, {}, {
            session: payload.session,
            populate: [
                ...(payload.withQuiz ? [{
                        path: 'quiz',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
                ...(payload.withResults ? [{
                        path: 'results',
                        select: {},
                        options: { session: payload.session }
                    }] : [])
            ],
        });
    }
    async updateResultsPush(payload) {
        const res = await this.attempts.updateOne({ _id: payload.id }, { $push: { results: payload.resultId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async editDateEnd(payload) {
        await this.attempts.updateOne({ _id: payload.id, user: payload.userId, quiz: payload.quizId }, { dateEnd: payload.dateEnd }, { session: payload.session });
        return this.getAttempt({
            id: payload.id,
            userId: payload.userId,
            quizId: payload.quizId,
            session: payload.session,
        });
    }
    async editIrRelevant(payload) {
        await this.attempts.updateOne({ _id: payload.id, user: payload.userId, quiz: payload.quizId }, { irRelevant: payload.irRelevant }, { session: payload.session });
        return this.getAttempt({
            id: payload.id,
            userId: payload.userId,
            quizId: payload.quizId,
            session: payload.session,
        });
    }
};
AttemptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(attempt_model_1.Attempt.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], AttemptsService);
exports.AttemptsService = AttemptsService;
//# sourceMappingURL=attempts.service.js.map