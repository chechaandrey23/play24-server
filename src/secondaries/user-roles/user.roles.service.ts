import {Injectable} from '@nestjs/common';
import {NotImplementedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {RoleInterface, RolesInterface} from '../../configs/roles.config';

@Injectable()
export class UserRolesService {
	constructor(private configService: ConfigService) {
    const roles = this.configService.get('roles.names');

    Object.keys(roles).forEach((key) => {
      Object.defineProperty(
        UserRolesService,
        'ROLE_'+roles[key],
        {value: roles[key], writable: false},
      );
    });
  }

  public async getRole(nameRole: string): Promise<RoleInterface> {
    const roles: RolesInterface = this.configService.get('roles.roles');
    if(!roles.hasOwnProperty(nameRole)) {
      throw new NotImplementedException(`Role with name "${nameRole}" does not exist`);
    }
    return roles[nameRole];
  }
}
