"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const quizs_service_1 = require("./quizs.service");
const quiz_model_1 = require("./quiz.model");
const question_model_1 = require("../questions/question.model");
let QuizsModule = class QuizsModule {
};
QuizsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: quiz_model_1.Quiz.name, schema: quiz_model_1.QuizSchema },
                { name: question_model_1.Question.name, schema: question_model_1.QuestionSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
        ],
        controllers: [],
        providers: [
            quizs_service_1.QuizsService
        ],
        exports: [
            quizs_service_1.QuizsService
        ]
    })
], QuizsModule);
exports.QuizsModule = QuizsModule;
//# sourceMappingURL=quizs.module.js.map