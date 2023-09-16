import {Injectable} from '@nestjs/common';
import {HttpException, HttpStatus, ConflictException, NotAcceptableException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Model, Connection, ClientSession} from 'mongoose';
import {mixin} from '../../../utils/mixin';
import {handlerError} from '../../../utils/handler.error';
import {MongooseSession, TypeMethodWithSession} from '../../../utils/mongoose.session';
import {InjectConnection} from '@nestjs/mongoose';
import SelectedRolesException from '../../../utils/selected.roles.exception';

import {MONGO_FIRST_CONNECT_NAME} from '../../../configs';

import {HashsService} from '../../../secondaries/hashs/hashs.service';

import {UsersService} from '../../../entries/users/users.service';
import {RolesService} from '../../../entries/roles/roles.service';
import {PasswordsService} from '../../../entries/passwords/passwords.service';

import {User, UserDocument} from '../../../entries/users/user.model';
import {Role, RoleDocument} from '../../../entries/roles/role.model';
import {Password, PasswordDocument} from '../../../entries/passwords/password.model';

import {
  CheckUserInterface, CheckUserIdInterface,
  CreateUserInterface,
  ComparePasswordInterface,
  GetUserIdInterface,
  GetRolesInterface,
} from './mediary.users.interface';

@Injectable()
export class MediaryUsersService implements MongooseSession {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
    private configService: ConfigService,
    private hashsService: HashsService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private passwordsService: PasswordsService,
	) {}

  public withSession: TypeMethodWithSession;

  public async checkUser(data: CheckUserInterface): Promise<UserDocument|null> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const user: UserDocument = await this.usersService.getUser({
          username: data.username,
          session,
          withRoles: true,
        });
        if(!user) throw new NotAcceptableException(`User "${data.username}" NOT FOUND`);

        if(!await this.comparePassword({
          userId: user.id, password: data.password, session: session
        })) {
          throw new NotAcceptableException(`Password is INCORRECT`);
        }

        return user;
      });
    } catch(e) {
      handlerError(e, {username: data.username});
    }
  }

  public async createUser(payload: CreateUserInterface): Promise<UserDocument> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        // create user
        const user = await this.usersService.createUser({
          username: payload.username,
          session,
        });

        // create password
        const hash = await this.hashsService.toHash(HashsService['SALT_PASSWORD'], payload.password);
        const password = await this.passwordsService.createPassword({
          userId: user.id,
          hash: hash,
          session,
        });

        // check Roles
        // add roles
        const config = this.configService.get('roles');
        const selectedRoles: Array<RoleDocument> = await this.rolesService.getAllRoles({
          session,
          ...(payload.roleIds?{ids: payload.roleIds}:{}),
          ...((payload.roles && !payload.roleIds)?{roles: payload.roles}:{}),
          limit: config.defaultMaxRoles,
          offset: 0,
        });

        if(selectedRoles.length < 1) {
          throw new SelectedRolesException('At least one role must be selected!!!');
        }

        await this.usersService.updateRolesSet({
          session,
          id: user.id,
          roleIds: selectedRoles.map((entry: RoleDocument): string => entry.id),
        });

        await this.rolesService.updateAllUsersPush({
          session,
          ids: selectedRoles.map((entry: RoleDocument): string => entry.id),
          userId: user.id,
        });

        await this.usersService.updatePasswordSet({
          session,
          id: user.id,
          passwordId: (password as PasswordDocument).id
        });

        return await this.usersService.getUser({
          id: user.id,
          withRoles: true,
          session,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

  public async comparePassword(data: ComparePasswordInterface): Promise<boolean> {
    const password: Password = await this.passwordsService.getPassword({
      session: data.session,
      userId: data.userId,
    });
    return await this.hashsService.compareHashSample(HashsService['SALT_PASSWORD'], password.hash, data.password);
  }

  public async checkUserId(data: CheckUserIdInterface): Promise<UserDocument|null> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const user = await this.usersService.getUser({
          id: data.userId,
          session,
          withRoles: true,
        });
        if(!user) throw new NotAcceptableException(`User with ID "${data.userId}" NOT FOUND`);

        return user;
      });
    } catch(e) {
      handlerError(e, {id: data.userId});
    }
  }

  public async getUser(data: GetUserIdInterface): Promise<UserDocument|null> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        return await this.usersService.getUser({
          id: data.id,
          withRoles: true,
          session,
        });
      });
    } catch(e) {
      handlerError(e, {id: data.id});
    }
  }

  public async getRoles(payload: GetRolesInterface): Promise<Array<RoleDocument>> {
    try {
      return await this.withSession(null, async (session: ClientSession) => {
        const config = this.configService.get('roles');
        return await this.rolesService.getAllRoles({
          session,
          limit: config.defaultMaxRoles,
          offset: 0,
        });
      });
    } catch(e) {
      handlerError(e, {});
    }
  }

}

mixin(MediaryUsersService, [MongooseSession]);
