"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOrArrayString = void 0;
const class_validator_1 = require("class-validator");
let IsStringOrArrayString = class IsStringOrArrayString {
    validate(data, args) {
        return (Array.isArray(data) && data.filter((item) => (typeof item === 'string')).length === data.length) || typeof data === 'string';
    }
    defaultMessage(args) {
        return '($value) must be string or Array<string>';
    }
};
IsStringOrArrayString = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'string-or-array-string', async: false })
], IsStringOrArrayString);
exports.IsStringOrArrayString = IsStringOrArrayString;
//# sourceMappingURL=validator.is.string.or.array.string.js.map