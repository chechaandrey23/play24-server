import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesService } from '../../../secondaries/user-roles/user.roles.service';
export declare class UserRoleGuard implements CanActivate {
    private reflector;
    private userRolesService;
    constructor(reflector: Reflector, userRolesService: UserRolesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
