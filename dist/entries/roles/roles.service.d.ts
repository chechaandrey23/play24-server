import { Connection } from 'mongoose';
import { RoleDocument, RoleModel } from './role.model';
import { UserRolesService } from '../../secondaries/user-roles/user.roles.service';
import { GetAllRolesInterface, UpdateAllUsersPushInterface, BulKCreateRolesInterafce, CheckDublicateRolesInterface } from './roles.interface';
export declare class RolesService {
    protected connection: Connection;
    private roles;
    private userRolesService;
    constructor(connection: Connection, roles: RoleModel, userRolesService: UserRolesService);
    getAllRoles(payload: GetAllRolesInterface): Promise<Array<RoleDocument>>;
    updateAllUsersPush(payload: UpdateAllUsersPushInterface): Promise<boolean>;
    bulKCreateRoles(payload: BulKCreateRolesInterafce): Promise<Array<RoleDocument>>;
    checkDublicateRoles(payload: CheckDublicateRolesInterface): Promise<boolean>;
}
