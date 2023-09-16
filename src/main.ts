import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import * as requestIp from 'request-ip';
import * as express from 'express';
import * as path from 'path';

import {PORT} from './configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const httpAdapter = app.getHttpAdapter();

  httpAdapter.use('/', express.static(path.resolve()+'/../client/build'));

  httpAdapter.use(cookieParser());

  httpAdapter.use(requestIp.mw());

  //app.enableCors({origin: 'http://localhost:3000', credentials: true});

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
