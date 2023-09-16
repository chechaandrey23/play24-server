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
exports.QuestionsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const question_model_1 = require("./question.model");
let QuestionsService = class QuestionsService {
    constructor(connection, questions) {
        this.connection = connection;
        this.questions = questions;
    }
    async getQuestions(payload) {
        return await this.questions.find(Object.assign(Object.assign(Object.assign({}, (payload.quizId ? { quiz: payload.quizId } : {})), (payload.ids ? { _id: { $in: payload.ids } } : {})), (payload.hasOwnProperty('draft') ? { draft: payload.draft } : {})), {}, {
            session: payload.session,
            skip: payload.offset,
            limit: payload.limit,
            populate: [
                ...(payload.withQuestionType ? [{
                        path: 'questionType',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
                ...(payload.withResults ? [Object.assign(Object.assign({ path: 'results', select: {} }, (payload.resultsWhere ? { match: payload.resultsWhere } : {})), { options: { session: payload.session } })] : []),
            ]
        });
    }
    async getQuestion(payload) {
        return await this.questions.findOne(Object.assign(Object.assign(Object.assign({}, (payload.quizId ? { quiz: payload.quizId } : {})), (payload.hasOwnProperty('draft') ? { draft: payload.draft } : {})), { _id: payload.id }), {}, {
            session: payload.session,
            populate: [
                ...(payload.withQuestionType ? [{
                        path: 'questionType',
                        select: {},
                        options: { session: payload.session }
                    }] : []),
                ...(payload.withResults ? [Object.assign(Object.assign({ path: 'results', select: {} }, (payload.resultsWhere ? { match: payload.resultsWhere } : {})), { options: { session: payload.session } })] : []),
                ...(payload.withQuiz ? [{
                        path: 'quiz',
                        select: {},
                        options: {
                            session: payload.session,
                            populate: [
                                ...(payload.withQuizAttempts ? [Object.assign(Object.assign({ path: 'attempts', select: {} }, (payload.quizAttemptsWhere ? { match: payload.quizAttemptsWhere } : {})), { options: { session: payload.session } })] : [])
                            ],
                        }
                    }] : []),
            ]
        });
    }
    async countQuestions(payload) {
        return await this.questions.countDocuments(Object.assign({ quiz: payload.quizId }, (payload.hasOwnProperty('draft') ? { draft: payload.draft } : {})), { session: payload.session });
    }
    async createQuestion(payload) {
        const [question] = await this.questions.create([{
                quiz: payload.quizId,
                questionType: payload.questionTypeId,
                question: payload.question,
                answerOptions: payload.answerOptions || [],
                answer: payload.answer || undefined,
                order: payload.order,
                draft: payload.draft,
                author: payload.authorId,
            }], { session: payload.session });
        return question;
    }
    async editQuestionDraft(payload) {
        await this.questions.updateOne({ _id: payload.id }, { draft: payload.draft }, { session: payload.session });
        return this.getQuestion({
            id: payload.id,
            session: payload.session
        });
    }
    async editOrder(payload) {
        const res = await this.questions.updateOne({ _id: payload.id, quiz: payload.quizId }, { $set: { order: payload.order } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async editOrderNew(payload) {
        const res = await this.questions.updateMany({ quiz: payload.quizId }, [{ $addFields: { order: {
                        $reduce: {
                            input: payload.orderQuestions,
                            initialValue: 0,
                            in: {
                                $cond: {
                                    if: { $eq: [{ $toObjectId: '$$this.id' }, '$_id'] },
                                    then: { $add: ['$$this.order', '$$value'] },
                                    else: { $add: [0, '$$value'] },
                                }
                            }
                        }
                    } } }], { session: payload.session });
        return res.modifiedCount === payload.orderQuestions.length;
    }
    async updateResultsPush(payload) {
        const res = await this.questions.updateOne({ _id: payload.id }, { $push: { results: payload.resultId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async deleteOne(payload) {
        const res = await this.questions.deleteOne({ _id: payload.id }, { session: payload.session });
        return res.deletedCount === 1;
    }
    async deleteMany(payload) {
        const res = await this.questions.deleteMany({ _id: { $in: payload.ids } }, { session: payload.session });
        return res.deletedCount === payload.ids.length;
    }
};
QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(question_model_1.Question.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map