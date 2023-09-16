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
exports.RegistrationDTO = exports.LogoutDTO = exports.LoginDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LoginDTO {
}
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class LogoutDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return !!value; }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LogoutDTO.prototype, "fullExit", void 0);
exports.LogoutDTO = LogoutDTO;
class RegistrationDTO {
}
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return value.map((val) => { return val + ''; }); }),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], RegistrationDTO.prototype, "roles", void 0);
exports.RegistrationDTO = RegistrationDTO;
//# sourceMappingURL=auth.dto.js.map