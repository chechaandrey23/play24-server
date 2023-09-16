import { ConfigService } from '@nestjs/config';
import { RoleInterface } from '../../configs/roles.config';
export declare class UserRolesService {
    private configService;
    constructor(configService: ConfigService);
    getRole(nameRole: string): Promise<RoleInterface>;
}
