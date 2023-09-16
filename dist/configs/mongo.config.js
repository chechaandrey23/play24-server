"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('mongo', () => ({
    uri: process.env.MONGO_URI || `mongodb://127.0.0.1:27017/play24?directConnection=true&serverSelectionTimeoutMS=2000`
}));
//# sourceMappingURL=mongo.config.js.map