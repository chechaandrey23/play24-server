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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const configs_1 = require("../../configs");
const password_model_1 = require("./password.model");
const hashs_service_1 = require("../../secondaries/hashs/hashs.service");
let PasswordsService = class PasswordsService {
    constructor(connection, passwords, hashsService) {
        this.connection = connection;
        this.passwords = passwords;
        this.hashsService = hashsService;
    }
    async getPassword(payload) {
        return await this.passwords.findOne(Object.assign(Object.assign({}, (payload.id ? { _id: payload.id } : {})), (payload.userId ? { user: payload.userId } : {})), {}, {
            session: payload.session,
        });
    }
    async createPassword(payload) {
        await this.checkDublicateUserId({ userId: payload.userId, session: payload.session });
        const [password] = await this.passwords.create([{
                hash: payload.hash, user: payload.userId,
            }], { session: payload.session });
        return password;
    }
    async checkDublicateUserId(payload) {
        const res = await this.passwords.findOne({
            user: payload.userId,
        }, null, {
            session: payload.session,
        });
        if (res) {
            throw new common_1.ConflictException(`User MongoDBId "${payload.userId}" already exists`);
        }
        return true;
    }
};
PasswordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)(configs_1.MONGO_FIRST_CONNECT_NAME)),
    __param(1, (0, mongoose_2.InjectModel)(password_model_1.Password.name, configs_1.MONGO_FIRST_CONNECT_NAME)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object, hashs_service_1.HashsService])
], PasswordsService);
exports.PasswordsService = PasswordsService;
//# sourceMappingURL=passwords.service.js.map