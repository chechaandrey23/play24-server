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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mediary_users_service_1 = require("../../../mediaries/auth/users/mediary.users.service");
const auth_dto_1 = require("../auth.dto");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(mediaryUsersService) {
        super();
        this.mediaryUsersService = mediaryUsersService;
    }
    async validate(username, password) {
        const loginDTO = new auth_dto_1.LoginDTO();
        loginDTO.username = username;
        loginDTO.password = password;
        const errors = await (0, class_validator_1.validate)(loginDTO);
        if (errors.length > 0) {
            throw new common_2.BadRequestException(errors.reduce((acc, entry) => {
                acc.push(...Object.keys(entry.constraints).map((key) => {
                    return entry.constraints[key];
                }));
                return acc;
            }, []));
        }
        const user = await this.mediaryUsersService.checkUser({
            username: loginDTO.username,
            password: loginDTO.password,
        });
        return {
            id: user.id,
            roles: user.roles.map((entry) => (entry.role)),
        };
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mediary_users_service_1.MediaryUsersService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map