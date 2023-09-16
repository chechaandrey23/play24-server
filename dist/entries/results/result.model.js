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
exports.ResultSchema = exports.Result = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../users/user.model");
const quiz_model_1 = require("../quizs/quiz.model");
const attempt_model_1 = require("../attempts/attempt.model");
const question_model_1 = require("../questions/question.model");
const question_type_model_1 = require("../question-types/question.type.model");
let Result = class Result {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_model_1.User)
], Result.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }),
    __metadata("design:type", quiz_model_1.Quiz)
], Result.prototype, "quiz", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }),
    __metadata("design:type", question_model_1.Question)
], Result.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }),
    __metadata("design:type", attempt_model_1.Attempt)
], Result.prototype, "attempt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType' }),
    __metadata("design:type", question_type_model_1.QuestionType)
], Result.prototype, "questionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Result.prototype, "userAnswer", void 0);
Result = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, selectPopulatedPaths: false })
], Result);
exports.Result = Result;
exports.ResultSchema = mongoose_1.SchemaFactory.createForClass(Result);
//# sourceMappingURL=result.model.js.map