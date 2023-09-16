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
exports.QuestionTypesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const question_type_model_1 = require("./question.type.model");
const dublicate_question_type_exception_1 = require("../../utils/dublicate.question.type.exception");
let QuestionTypesService = class QuestionTypesService {
    constructor(connection, questionTypes) {
        this.connection = connection;
        this.questionTypes = questionTypes;
    }
    async getQuestionType(payload) {
        return await this.questionTypes.findOne({
            _id: payload.id,
        }, {}, {
            session: payload.session,
        });
    }
    async getAllQuestionTypes(payload) {
        return await this.questionTypes.find(Object.assign(Object.assign({}, (payload.ids ? { _id: { $in: payload.ids } } : {})), (payload.types ? { type: { $in: payload.types } } : {})), {}, {
            session: payload.session,
            skip: payload.offset,
            limit: payload.limit,
        });
    }
    async bulKCreateQuestionTypes(payload) {
        await this.checkDublicateQuestionTypes({ types: payload.questionTypes.map((item) => item.type) });
        return await this.questionTypes.create(payload.questionTypes, { session: payload.session });
    }
    async checkDublicateQuestionTypes(payload) {
        const res = await this.questionTypes.find({
            type: { $in: payload.types }
        }, null, {
            session: payload.session,
        });
        if (res.length > 0) {
            throw new dublicate_question_type_exception_1.default(`QuestionType with type "${res[0].type}" already exists`);
        }
        return true;
    }
    async updateResultsPush(payload) {
        const res = await this.questionTypes.updateOne({ _id: payload.id }, { $push: { results: payload.resultId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateQuestionsPush(payload) {
        const res = await this.questionTypes.updateOne({ _id: payload.id }, { $push: { questions: payload.questionId } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateQuestionsPull(payload) {
        const res = await this.questionTypes.updateOne({ _id: payload.id }, { $pullAll: { questions: [payload.questionId] } }, { session: payload.session });
        return res.modifiedCount === 1;
    }
    async updateAllManyQuestionsPull(payload) {
        const res = await this.questionTypes.updateMany({ questions: { $all: payload.questionIds } }, { $pullAll: { questions: payload.questionIds } }, { session: payload.session });
        return res.modifiedCount === payload.questionIds.length;
    }
};
QuestionTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(question_type_model_1.QuestionType.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], QuestionTypesService);
exports.QuestionTypesService = QuestionTypesService;
//# sourceMappingURL=question.types.service.js.map