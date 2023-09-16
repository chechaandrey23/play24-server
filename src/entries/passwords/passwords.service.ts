import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {Password, PasswordDocument, PasswordSchema, PasswordModel} from './password.model';

import {
  GetPasswordInterface,
  CreatePasswordInterface, CheckDublicateUserIdInterface,
} from './passwords.interface';

import {HashsService} from '../../secondaries/hashs/hashs.service';

@Injectable()
export class PasswordsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(Password.name, MONGO_FIRST_CONNECT_NAME) private passwords: PasswordModel,
		private hashsService: HashsService,
	) {}

  public async getPassword(payload: GetPasswordInterface): Promise<Password> {
    return await this.passwords.findOne({
      ...(payload.id?{_id: payload.id}:{}),
			...(payload.userId?{user: payload.userId}:{}),
		}, {}, {
			session: payload.session,
		});
  }

  public async createPassword(payload: CreatePasswordInterface): Promise<Password> {
    await this.checkDublicateUserId({userId: payload.userId, session: payload.session});
    const [password] = await this.passwords.create([{
			hash: payload.hash, user: payload.userId,
		}], {session: payload.session});
		return password;
  }

  public async checkDublicateUserId(payload: CheckDublicateUserIdInterface): Promise<boolean> {
    const res = await this.passwords.findOne({
			user: payload.userId,
		}, null, {
			session: payload.session,
		});
		if(res) {
			throw new ConflictException(`User MongoDBId "${payload.userId}" already exists`);
		}
		return true;
  }

}
