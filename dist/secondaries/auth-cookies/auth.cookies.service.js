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
exports.AuthCookiesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AuthCookiesService = class AuthCookiesService {
    constructor(configService) {
        this.configService = configService;
        this.cookies = {};
        const defaultCookies = this.configService.get('auth-cookies.names');
        this.cookies = defaultCookies.reduce((acc, name) => {
            const nameString = name;
            const nameObject = name;
            if (!nameObject.hasOwnProperty('name')) {
                acc[nameString] = {
                    name: nameString,
                    value: '',
                    httpOnly: false,
                    ttl: 0,
                    touch: false,
                };
            }
            else {
                acc[nameObject.name] = {
                    name: nameObject.name,
                    value: '',
                    httpOnly: nameObject.httpOnly,
                    ttl: 0,
                    touch: false,
                };
            }
            return acc;
        }, {});
    }
    add(name, value, httpOnly, ttl) {
        this.cookies[name] = {
            name: name,
            value: value,
            httpOnly: httpOnly,
            ttl: ttl,
            touch: true,
        };
    }
    delete(name) {
        if (this.cookies.hasOwnProperty(name)) {
            this.cookies[name].touch = true;
            this.cookies[name].ttl = 0;
            this.cookies[name].value = '';
        }
    }
    deleteAll() {
        Object.keys(this.cookies).forEach((key) => {
            this.cookies[key].touch = true;
            this.cookies[key].ttl = 0;
            this.cookies[key].value = '';
        });
    }
    toArrayString() {
        return Object.keys(this.cookies).map((key) => {
            const value = (typeof this.cookies[key].value == 'object')
                ? JSON.stringify(this.cookies[key].value)
                : this.cookies[key].value;
            return `${this.cookies[key].name}=${value}; ${this.cookies[key].httpOnly ? 'HttpOnly;' : ''} Path=/; Max-Age=${this.cookies[key].ttl}`;
        });
    }
};
AuthCookiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthCookiesService);
exports.AuthCookiesService = AuthCookiesService;
//# sourceMappingURL=auth.cookies.service.js.map