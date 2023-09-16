"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const requestIp = require("request-ip");
const express = require("express");
const path = require("path");
const configs_1 = require("./configs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.use('/', express.static(path.resolve() + '/../client/build'));
    httpAdapter.use(cookieParser());
    httpAdapter.use(requestIp.mw());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(configs_1.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map