import {registerAs} from '@nestjs/config';

import {ROLE_ADMIN_VALUE, ROLE_USER_VALUE, ROLE_GUEST_VALUE} from './roles.config';

export default registerAs('users', () => ({
  defaultUsers: [
    {username: 'admin', password: 'admin', roles: [ROLE_ADMIN_VALUE, ROLE_USER_VALUE, ROLE_GUEST_VALUE]},
    {username: 'user1', password: 'password', roles: [ROLE_USER_VALUE, ROLE_GUEST_VALUE]},
    {username: 'user2', password: 'password', roles: [ROLE_USER_VALUE, ROLE_GUEST_VALUE]},
  ]
}));
