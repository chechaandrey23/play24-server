import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MongooseSession, TypeMethodWithSession } from '../../../utils/mongoose.session';
import { UserRolesService } from '../../../secondaries/user-roles/user.roles.service';
import { QuizsService } from '../../../entries/quizs/quizs.service';
import { QuestionsService } from '../../../entries/questions/questions.service';
import { QuestionTypesService } from '../../../entries/question-types/question.types.service';
import { RolesService } from '../../../entries/roles/roles.service';
import { UsersService } from '../../../entries/users/users.service';
import { QuestionTypeDocument } from '../../../entries/question-types/question.type.model';
import { RoleDocument } from '../../../entries/roles/role.model';
import { CheckAndCreateRolesInterafce, CheckAndCreateQuestionTypesInterface } from './mediary.inits.interface';
export declare class MediaryInitsService implements MongooseSession {
    protected connection: Connection;
    private configService;
    private usersService;
    private quizsService;
    private questionsService;
    private questionTypesService;
    private rolesService;
    private userRolesService;
    constructor(connection: Connection, configService: ConfigService, usersService: UsersService, quizsService: QuizsService, questionsService: QuestionsService, questionTypesService: QuestionTypesService, rolesService: RolesService, userRolesService: UserRolesService);
    withSession: TypeMethodWithSession;
    checkAndCreateRoles(payload: CheckAndCreateRolesInterafce): Promise<Array<RoleDocument>>;
    checkAndCreateQuestionTypes(payload: CheckAndCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>>;
}
