import {Injectable, Inject, CanActivate, ExecutionContext} from '@nestjs/common';
import {UnauthorizedException, HttpException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRolesService} from '../../../secondaries/user-roles/user.roles.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(UserRolesService) private userRolesService: UserRolesService,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		return user.roles.includes(await this.userRolesService.getRole(UserRolesService['ROLE_ADMIN']));
	}
}
