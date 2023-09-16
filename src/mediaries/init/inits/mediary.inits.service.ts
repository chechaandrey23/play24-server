import {Injectable} from '@nestjs/common';
import {HttpException, HttpStatus, ConflictException, NotAcceptableException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {Model, Connection, ClientSession} from 'mongoose';
import {mixin} from '../../../utils/mixin';
import {handlerError} from '../../../utils/handler.error';
import {MongooseSession, TypeMethodWithSession} from '../../../utils/mongoose.session';

import {UserRolesService} from '../../../secondaries/user-roles/user.roles.service';

import {QuizsService} from '../../../entries/quizs/quizs.service';
import {QuestionsService} from '../../../entries/questions/questions.service';
import {QuestionTypesService} from '../../../entries/question-types/question.types.service';
import {RolesService} from '../../../entries/roles/roles.service';
import {UsersService} from '../../../entries/users/users.service';

import {Quiz, QuizDocument} from '../../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../../entries/questions/question.model';
import {QuestionType, QuestionTypeDocument} from '../../../entries/question-types/question.type.model';
import {User, UserDocument} from '../../../entries/users/user.model';
import {Role, RoleDocument} from '../../../entries/roles/role.model';

import {
  QUESTION_RANDOM_ANSWER,
  QUESTION_MATCH_ANSWER,
  QUESTION_MATCH_ANSWER_OPTIONS,
  QUESTION_MULTI_MATCH_ANSWER_OPTIONS,
} from '../../../entries/question-types/question.types';

import {
  CheckAndCreateRolesInterafce, CheckAndCreateQuestionTypesInterface,
} from './mediary.inits.interface';

import {MONGO_FIRST_CONNECT_NAME} from '../../../configs';

@Injectable()
export class MediaryInitsService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
    private configService: ConfigService,
    private usersService: UsersService,
    private quizsService: QuizsService,
    private questionsService: QuestionsService,
    private questionTypesService: QuestionTypesService,
    private rolesService: RolesService,
    private userRolesService: UserRolesService,
	) {}

  public withSession: TypeMethodWithSession;

  public async checkAndCreateRoles(payload: CheckAndCreateRolesInterafce): Promise<Array<RoleDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('roles');
        const roles: Array<RoleDocument> = await this.rolesService.getAllRoles({
          session,
          limit: config.defaultMaxRoles,
          offset: 0,
        });

        const newRoles = [];

        const defaultRoleNames = config.names;

        await Object.keys(defaultRoleNames).forEach(async (roleKey) => {
          const roleName = defaultRoleNames[roleKey];
          const role = await this.userRolesService.getRole(roleName);
          const currentRoles = roles.filter((entry: RoleDocument) => {
            return entry.role == role;
          });
          if(currentRoles.length == 0) {
            newRoles.push({role: role, title: roleName, description: roleName});
          }
        });

        if(newRoles.length > 1) {
          return await this.rolesService.bulKCreateRoles({
            session,
            roles: newRoles,
          })
        }

        return roles;
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async checkAndCreateQuestionTypes(payload: CheckAndCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('question-types');
        const questionTypes: Array<QuestionTypeDocument> = await this.questionTypesService.getAllQuestionTypes({
          session,
          limit: config.defaultMaxQuestionTypes,
          offset: 0,
        });

        const newQuestionTypes = [];

        const defaultQuestionTypes = [
          QUESTION_RANDOM_ANSWER,
          QUESTION_MATCH_ANSWER,
          QUESTION_MATCH_ANSWER_OPTIONS,
          QUESTION_MULTI_MATCH_ANSWER_OPTIONS,
        ];

        defaultQuestionTypes.forEach((type) => {
          const currentQuestionTypes = questionTypes.filter((entry: QuestionTypeDocument) => {
            return entry.type == type;
          });
          if(currentQuestionTypes.length == 0) {
            newQuestionTypes.push({type: type, title: 'type->'+type, description: 'type->'+type});
          }
        });

        if(newQuestionTypes.length > 1) {
          return await this.questionTypesService.bulKCreateQuestionTypes({
            session,
            questionTypes: newQuestionTypes,
          })
        }

        return questionTypes;
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

}

mixin(MediaryInitsService, [MongooseSession]);
