import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleDocument } from '../../entries/roles/role.model';
import { QuestionTypeDocument } from '../../entries/question-types/question.type.model';
import { MediaryInitsService } from '../../mediaries/init/inits/mediary.inits.service';
import { CheckAndCreateRolesInterafce, CheckAndCreateQuestionTypesInterface } from './init.interface';
export declare class InitService implements OnModuleInit {
    private configService;
    private mediaryInitsService;
    constructor(configService: ConfigService, mediaryInitsService: MediaryInitsService);
    onModuleInit(): Promise<void>;
    checkAndCreateRoles(payload: CheckAndCreateRolesInterafce): Promise<Array<RoleDocument>>;
    checkAndCreateQuestionTypes(payload: CheckAndCreateQuestionTypesInterface): Promise<Array<QuestionTypeDocument>>;
}
