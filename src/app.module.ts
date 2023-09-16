import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';

import jwtConfig from './configs/jwt.config';
import rolesConfig from './configs/roles.config';
import usersConfig from './configs/users.config';
import saltsConfig from './configs/salts.config';
import authCookiesConfig from './configs/auth.cookies.config';
import refreshTokenConfig from './configs/refresh.token.config';
import mongoConfig from './configs/mongo.config';
import quizsConfig from './configs/quizs.config';
import questionsConfig from './configs/questions.config';
import attemptsConfig from './configs/attempts.config';
import questionTypesConfig from './configs/question.types.config';

import {FinalModule} from './endpoints/final/final.module';
import {AuthModule} from './endpoints/auth/auth.module';
import {UserModule} from './endpoints/user/user.module';
import {AdminModule} from './endpoints/admin/admin.module';
import {InitModule} from './endpoints/init/init.module';

import {MONGO_FIRST_CONNECT_NAME} from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        jwtConfig,
        rolesConfig,
        usersConfig,
        saltsConfig,
        authCookiesConfig,
        refreshTokenConfig,
        mongoConfig,
        quizsConfig,
        questionsConfig,
        attemptsConfig,
        questionTypesConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: MONGO_FIRST_CONNECT_NAME,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    UserModule,
    InitModule,
    FinalModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
