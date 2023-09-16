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
exports.QuestionSchema = exports.Question = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const quiz_model_1 = require("../quizs/quiz.model");
const question_type_model_1 = require("../question-types/question.type.model");
const user_model_1 = require("../users/user.model");
let Question = class Question {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Question.prototype, "answerOptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Question.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }),
    __metadata("design:type", quiz_model_1.Quiz)
], Question.prototype, "quiz", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Question.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "draft", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_model_1.User)
], Question.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType' }),
    __metadata("design:type", question_type_model_1.QuestionType)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }] }),
    __metadata("design:type", Array)
], Question.prototype, "results", void 0);
Question = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, selectPopulatedPaths: false })
], Question);
exports.Question = Question;
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Question);
//# sourceMappingURL=question.model.js.map