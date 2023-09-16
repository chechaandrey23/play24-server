"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseSession = void 0;
const common_1 = require("@nestjs/common");
let MongooseSession = class MongooseSession {
    async withSession(session, fn) {
        const currentSession = session ? session : await this.connection.startSession();
        let res;
        if (!session) {
            try {
                currentSession.startTransaction();
                res = await fn.call(null, currentSession);
                await currentSession.commitTransaction();
            }
            catch (e) {
                await currentSession.abortTransaction();
                throw e;
            }
            finally {
                currentSession.endSession();
            }
        }
        else {
            res = await fn.call(null, session);
        }
        return res;
    }
};
MongooseSession = __decorate([
    (0, common_1.Injectable)()
], MongooseSession);
exports.MongooseSession = MongooseSession;
//# sourceMappingURL=mongoose.session.js.map