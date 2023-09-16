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
var HashsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
let HashsService = HashsService_1 = class HashsService {
    constructor(configService) {
        this.configService = configService;
        const salts = this.configService.get('salts.names');
        Object.keys(salts).forEach((key) => {
            Object.defineProperty(HashsService_1, 'SALT_' + salts[key], { value: salts[key], writable: false });
        });
    }
    async getSalt(salt) {
        const salts = this.configService.get('salts.salts');
        if (!salts.hasOwnProperty(salt)) {
            throw new common_2.NotImplementedException(`Salt with name "${salt}" does not exist`);
        }
        return salts[salt];
    }
    async toHash(saltName, password) {
        const salt = await this.getSalt(saltName);
        return await bcrypt.hash(salt.secretStart + password + salt.secretEnd, salt.rounds);
    }
    async compareHashSample(saltName, hash, clientPassword) {
        const salt = await this.getSalt(saltName);
        return await bcrypt.compare(salt.secretStart + clientPassword + salt.secretEnd, hash);
    }
};
HashsService = HashsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HashsService);
exports.HashsService = HashsService;
//# sourceMappingURL=hashs.service.js.map