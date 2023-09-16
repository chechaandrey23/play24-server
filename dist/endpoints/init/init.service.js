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
exports.InitService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mediary_inits_service_1 = require("../../mediaries/init/inits/mediary.inits.service");
let InitService = class InitService {
    constructor(configService, mediaryInitsService) {
        this.configService = configService;
        this.mediaryInitsService = mediaryInitsService;
    }
    async onModuleInit() {
        const res = await this.checkAndCreateRoles({});
        const res1 = await this.checkAndCreateQuestionTypes({});
    }
    async checkAndCreateRoles(payload) {
        return await this.mediaryInitsService.checkAndCreateRoles({});
    }
    async checkAndCreateQuestionTypes(payload) {
        return await this.mediaryInitsService.checkAndCreateQuestionTypes({});
    }
};
InitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mediary_inits_service_1.MediaryInitsService])
], InitService);
exports.InitService = InitService;
//# sourceMappingURL=init.service.js.map