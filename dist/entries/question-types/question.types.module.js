"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTypesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const question_types_service_1 = require("./question.types.service");
const question_type_model_1 = require("./question.type.model");
let QuestionTypesModule = class QuestionTypesModule {
};
QuestionTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_type_model_1.QuestionType.name, schema: question_type_model_1.QuestionTypeSchema },
            ], configs_1.MONGO_FIRST_CONNECT_NAME),
        ],
        controllers: [],
        providers: [
            question_types_service_1.QuestionTypesService
        ],
        exports: [
            question_types_service_1.QuestionTypesService
        ]
    })
], QuestionTypesModule);
exports.QuestionTypesModule = QuestionTypesModule;
//# sourceMappingURL=question.types.module.js.map