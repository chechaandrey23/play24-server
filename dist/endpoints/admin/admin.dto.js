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
exports.OrderQuestionsDTO = exports.EditQuestionDraftDTO = exports.DeleteQuestionDTO = exports.CreateQuestionDTO = exports.EditQuizDraftDTO = exports.DeleteQuizDTO = exports.CreateQuizDTO = exports.QuizQuestionDTO = exports.QuizAllQuestionsDTO = exports.ResetResultQuizAttemptDTO = exports.ResultsForQuizDTO = exports.QuizDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizDTO.prototype, "quizId", void 0);
exports.QuizDTO = QuizDTO;
class ResultsForQuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultsForQuizDTO.prototype, "quizId", void 0);
exports.ResultsForQuizDTO = ResultsForQuizDTO;
class ResetResultQuizAttemptDTO extends ResultsForQuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetResultQuizAttemptDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetResultQuizAttemptDTO.prototype, "attemptId", void 0);
exports.ResetResultQuizAttemptDTO = ResetResultQuizAttemptDTO;
class QuizAllQuestionsDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAllQuestionsDTO.prototype, "quizId", void 0);
exports.QuizAllQuestionsDTO = QuizAllQuestionsDTO;
class QuizQuestionDTO extends QuizAllQuestionsDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizQuestionDTO.prototype, "questionId", void 0);
exports.QuizQuestionDTO = QuizQuestionDTO;
class CreateQuizDTO {
}
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDTO.prototype, "quizname", void 0);
__decorate([
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    __metadata("design:type", Number)
], CreateQuizDTO.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    __metadata("design:type", Number)
], CreateQuizDTO.prototype, "numberOfAttempts", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return !!value; }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuizDTO.prototype, "draft", void 0);
exports.CreateQuizDTO = CreateQuizDTO;
class DeleteQuizDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteQuizDTO.prototype, "id", void 0);
exports.DeleteQuizDTO = DeleteQuizDTO;
class EditQuizDraftDTO extends DeleteQuizDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return !!value; }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EditQuizDraftDTO.prototype, "draft", void 0);
exports.EditQuizDraftDTO = EditQuizDraftDTO;
class CreateQuestionDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "questionTypeId", void 0);
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => Array.isArray(o.answerOptions)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.MinLength)(1, { each: true }),
    (0, class_validator_1.MaxLength)(255, { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDTO.prototype, "answerOptions", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.answer !== null && o.answer !== undefined),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDTO.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => Array.isArray(o.answerArray)),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.MinLength)(1, { each: true }),
    (0, class_validator_1.MaxLength)(255, { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDTO.prototype, "answerArray", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return !!value; }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuestionDTO.prototype, "draft", void 0);
exports.CreateQuestionDTO = CreateQuestionDTO;
class DeleteQuestionDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteQuestionDTO.prototype, "id", void 0);
exports.DeleteQuestionDTO = DeleteQuestionDTO;
class EditQuestionDraftDTO extends DeleteQuestionDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return !!value; }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EditQuestionDraftDTO.prototype, "draft", void 0);
exports.EditQuestionDraftDTO = EditQuestionDraftDTO;
class OrderQuestionItemDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderQuestionItemDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    __metadata("design:type", Number)
], OrderQuestionItemDTO.prototype, "order", void 0);
class OrderQuestionsDTO {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderQuestionsDTO.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], OrderQuestionsDTO.prototype, "orderQuestions", void 0);
exports.OrderQuestionsDTO = OrderQuestionsDTO;
//# sourceMappingURL=admin.dto.js.map