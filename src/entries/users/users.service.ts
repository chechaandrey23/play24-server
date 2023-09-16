import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {User, UserDocument, UserModel} from './user.model';
import {Role, RoleDocument, RoleModel} from '../roles/role.model';

import {UserRolesService} from '../../secondaries/user-roles/user.roles.service';

import {
	GetUserInterface,
	CreateUserInterface, CheckDublicateUsernameInterface,
	UpdateRolesSetInterface,
	UpdateResultsPushInterface, UpdateAttemptsPushInterface,
	UpdateCompletedQuizsPushInterface, UpdateCompletedQuizsPullInterface, UpdateAllCompletedQuizsPullInterface,
	UpdateRefreshTokensPushInterface,
	UpdateRefreshTokensPullInterface, UpdateRefreshTokensPullAllInterface,
	UpdatePasswordSetInterface,
} from './users.interface';

import DublicateUsernameException from '../../utils/dublicate.username.exception';

@Injectable()
export class UsersService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(User.name, MONGO_FIRST_CONNECT_NAME) private users: UserModel,
		@InjectModel(Role.name, MONGO_FIRST_CONNECT_NAME) private roles: RoleModel,
		private userRolesService: UserRolesService,
	) {}

	public async getUser(payload: GetUserInterface): Promise<UserDocument|null> {
		if(!payload.id && !payload.username) {
			throw new ConflictException('One of the parameters must be specified: username or userId');
		}
		return await this.users.findOne({
			...(payload.id?{_id: payload.id}:{}),
			...(payload.username?{username: payload.username}:{}),
		}, {}, {
			session: payload.session,
			populate: [
				...(payload.withRoles?[{
						path: 'roles',
						select: {},
						options: {session: payload.session}
					}]:[]),
			]
		});
	}

	public async createUser(payload: CreateUserInterface): Promise<UserDocument> {
		await this.checkDublicateUsername({username: payload.username, session: payload.session});
    const [user] = await this.users.create([{
			username: payload.username,
		}], {session: payload.session});
		return user;
	}

	public async checkDublicateUsername(payload: CheckDublicateUsernameInterface): Promise<boolean> {
		const res = await this.users.findOne({
			username: payload.username,
		}, null, {
			session: payload.session,
		});
		if(res) {
			throw new DublicateUsernameException(`User with username "${payload.username}" already exists`);
		}
		return true;
	}

	public async updateRolesSet(payload: UpdateRolesSetInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$set: {roles: payload.roleIds}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updatePasswordSet(payload: UpdatePasswordSetInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$set: {password: payload.passwordId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateRefreshTokensPush(payload: UpdateRefreshTokensPushInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$push: {refreshTokens: payload.refreshTokenId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean> {
    const res = await this.users.updateOne(
			{_id: payload.id},
			{$push: {results: payload.resultId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

	public async updateAttemptsPush(payload: UpdateAttemptsPushInterface): Promise<boolean> {
    const res = await this.users.updateOne(
			{_id: payload.id},
			{$push: {attempts: payload.attemptId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
  }

	public async updateCompletedQuizsPush(payload: UpdateCompletedQuizsPushInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$push: {completedQuizs: payload.quizId}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateRefreshTokensPull(payload: UpdateRefreshTokensPullInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$pullAll: {resreshTokens: [payload.refreshTokenId]}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateRefreshTokensPullAll(payload: UpdateRefreshTokensPullAllInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$pullAll: {resreshTokens: payload.refreshTokenIds}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateCompletedQuizsPull(payload: UpdateCompletedQuizsPullInterface): Promise<boolean> {
		const res = await this.users.updateOne(
			{_id: payload.id},
			{$pullAll: {completedQuizs: [payload.quizId]}},
			{session: payload.session}
		);
		return res.modifiedCount === 1;
	}

	public async updateAllCompletedQuizsPull(payload: UpdateAllCompletedQuizsPullInterface): Promise<boolean> {
		const count = await this.users.countDocuments(
      {completedQuizs: {$all: [payload.quizId]}},
      {session: payload.session}
    );
		const res = await this.users.updateMany(
			{completedQuizs: {$all: [payload.quizId]}},
			{$pullAll: {completedQuizs: [payload.quizId]}},
			{session: payload.session}
		);
		return res.modifiedCount === count;
	}
}
