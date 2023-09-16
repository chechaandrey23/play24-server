"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaryResultsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_results_service_1 = require("./mediary.results.service");
const quizs_module_1 = require("../../../entries/quizs/quizs.module");
const results_module_1 = require("../../../entries/results/results.module");
const users_module_1 = require("../../../entries/users/users.module");
const attempts_module_1 = require("../../../entries/attempts/attempts.module");
let MediaryResultsModule = class MediaryResultsModule {
};
MediaryResultsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            users_module_1.UsersModule,
            quizs_module_1.QuizsModule,
            results_module_1.ResultsModule,
            attempts_module_1.AttemptsModule,
        ],
        controllers: [],
        providers: [
            mediary_results_service_1.MediaryResultsService,
        ],
        exports: [
            mediary_results_service_1.MediaryResultsService,
        ]
    })
], MediaryResultsModule);
exports.MediaryResultsModule = MediaryResultsModule;
//# sourceMappingURL=mediary.results.module.js.map