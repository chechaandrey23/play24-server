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
exports.QuizSchema = exports.Quiz = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../users/user.model");
let Quiz = class Quiz {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Quiz.prototype, "quizname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, ruquired: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Quiz.prototype, "numberOfAttempts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "draft", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_model_1.User)
], Quiz.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }] }),
    __metadata("design:type", Array)
], Quiz.prototype, "results", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }] }),
    __metadata("design:type", Array)
], Quiz.prototype, "attempts", void 0);
Quiz = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, selectPopulatedPaths: false })
], Quiz);
exports.Quiz = Quiz;
exports.QuizSchema = mongoose_1.SchemaFactory.createForClass(Quiz);
//# sourceMappingURL=quiz.model.js.map