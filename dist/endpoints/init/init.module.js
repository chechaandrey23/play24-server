"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const init_service_1 = require("./init.service");
const mediary_inits_module_1 = require("../../mediaries/init/inits/mediary.inits.module");
let InitModule = class InitModule {
};
InitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mediary_inits_module_1.MediaryInitsModule,
        ],
        controllers: [],
        providers: [
            init_service_1.InitService,
        ],
        exports: [
            init_service_1.InitService
        ]
    })
], InitModule);
exports.InitModule = InitModule;
//# sourceMappingURL=init.module.js.map