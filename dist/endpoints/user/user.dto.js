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
exports.AnswerDTO = exports.QuizAttemptQuestionDTO = exports.QuizAttemptDTO = exports.QuizDTO = void 0;
const class_validator_1 = require("class-validator");
class QuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizDTO.prototype, "quizId", void 0);
exports.QuizDTO = QuizDTO;
class QuizAttemptDTO extends QuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAttemptDTO.prototype, "attemptId", void 0);
exports.QuizAttemptDTO = QuizAttemptDTO;
class QuizAttemptQuestionDTO extends QuizAttemptDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAttemptQuestionDTO.prototype, "questionId", void 0);
exports.QuizAttemptQuestionDTO = QuizAttemptQuestionDTO;
class AnswerDTO {
}
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.answer !== null && o.answer !== undefined),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnswerDTO.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => Array.isArray(o.answerArray)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.MinLength)(1, { each: true }),
    (0, class_validator_1.MaxLength)(255, { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AnswerDTO.prototype, "answerArray", void 0);
exports.AnswerDTO = AnswerDTO;
//# sourceMappingURL=user.dto.js.map