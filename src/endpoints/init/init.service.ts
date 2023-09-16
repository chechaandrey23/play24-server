import {ConflictException, NotAcceptableException, HttpException, Injectable, OnModuleInit} from '@nestjs/common';
import {Request} from 'express';
import {ConfigService} from '@nestjs/config';

import {Quiz, QuizDocument} from '../../entries/quizs/quiz.model';
import {Role, RoleDocument} from '../../entries/roles/role.model';
import {User, UserDocument} from '../../entries/users/user.model';
import {QuestionType, QuestionTypeDocument} from '../../entries/question-types/question.type.model';

import {MediaryInitsService} from '../../mediaries/init/inits/mediary.inits.service';

import {
  CheckAndCreateRolesInterafce,
  CheckAndCreateUsersInterface,
  CheckAndCreateQuestionTypesInterface,
} from './init.interface';

import DublicateUsernameException from '../../utils/dublicate.username.exception';

@Injectable()
export class InitService implements OnModuleInit {
	constructor(
    private configService: ConfigService,
    private mediaryInitsService: MediaryInitsService,
	) {}

  async onModuleInit(): Promise<void> {
    const res = await this.checkAndCreateRoles({});
    const res1 = await this.checkAndCreateQuestionTypes({});
  }

  public async checkAndCreateRoles(payload: CheckAndCreateRolesInterafce): Promise<Array<RoleDocument>> {
    return await this.mediaryInitsService.checkAndCreateRoles({});
  }

  public async checkAndCreateQuestionTypes(payload: CheckAndCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    return await this.mediaryInitsService.checkAndCreateQuestionTypes({});
  }

}
