import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Role, RoleDocument, RoleSchema, RoleModel} from './role.model';

import {UserRolesService} from '../../secondaries/user-roles/user.roles.service';

import {
  GetAllRolesInterface,
  UpdateAllUsersPushInterface,
  BulKCreateRolesInterafce, CheckDublicateRolesInterface,
} from './roles.interface';

import DublicateRoleException from '../../utils/dublicate.role.exception';

@Injectable()
export class RolesService {
	constructor(
    @InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Role.name, MONGO_FIRST_CONNECT_NAME) private roles: RoleModel,
    private userRolesService: UserRolesService,
	) {}

  public async getAllRoles(payload: GetAllRolesInterface): Promise<Array<RoleDocument>> {
    return await this.roles.find({
      ...(payload.ids?{_id: {$in: payload.ids}}:{}),
      ...(payload.roles?{role: {$in: payload.roles}}:{})
    }, {}, {
      session: payload.session,
      skip: payload.offset,
      limit: payload.limit,
    });
  }

  public async updateAllUsersPush(payload: UpdateAllUsersPushInterface): Promise<boolean> {
    const res = await this.roles.updateMany({
      _id: {$in: payload.ids}
    }, {
      $push: {users: payload.userId}
    }, {
      session: payload.session,
    });
    return res.modifiedCount === payload.ids.length;
  }

  public async bulKCreateRoles(payload: BulKCreateRolesInterafce): Promise<Array<RoleDocument>> {
    await this.checkDublicateRoles({roles: payload.roles.map((item) => item.role)});
    return await this.roles.create(payload.roles, {session: payload.session});
  }

  public async checkDublicateRoles(payload: CheckDublicateRolesInterface): Promise<boolean> {
    const res = await this.roles.find({
			role: {$in: payload.roles}
		}, null, {
			session: payload.session,
		});
		if(res.length > 0) {
			throw new DublicateRoleException(`Role with role "${res[0].role}" already exists`);
		}
		return true;
  }
}
