import {registerAs} from '@nestjs/config';

const ROLE_ADMIN = 'ADMIN';
const ROLE_USER = 'USER';
const ROLE_GUEST = 'GUEST';

export const ROLE_ADMIN_VALUE = 100;
export const ROLE_USER_VALUE = 10;
export const ROLE_GUEST_VALUE = 1;

const DEFAULT_MAX_ROLES = 100;

export type RoleInterface = number;
export type RolesInterface = {[key: string]: RoleInterface};
export type DefaultRolesInterface = Array<RoleInterface>;

export default registerAs('roles', () => ({
  roles: {
    [ROLE_ADMIN]: ROLE_ADMIN_VALUE as RoleInterface,
    [ROLE_USER]: ROLE_USER_VALUE as RoleInterface,
    [ROLE_GUEST]: ROLE_GUEST_VALUE as RoleInterface,
  } as RolesInterface,
  names: {
    admin: ROLE_ADMIN,
    user: ROLE_USER,
    guest: ROLE_GUEST,
  },
  defaultMaxRoles: DEFAULT_MAX_ROLES as RoleInterface,
  defaultRoles: [ROLE_GUEST_VALUE, ROLE_USER_VALUE] as DefaultRolesInterface,
}));
