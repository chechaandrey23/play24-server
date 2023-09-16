"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const common_1 = require("@nestjs/common");
function handlerError(e, data = {}) {
    console.error(e);
    if (e instanceof common_1.HttpException) {
        throw e;
    }
    else {
        throw new common_1.InternalServerErrorException(Object.assign(Object.assign({}, data), { reason: e.toString() }));
    }
}
exports.handlerError = handlerError;
//# sourceMappingURL=handler.error.js.map