import {Model, Connection, ClientSession} from 'mongoose';
import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {mixin} from '../../utils/mixin';

import {MONGO_FIRST_CONNECT_NAME} from '../../configs';

import {RefreshTokenHash, RefreshTokenHashDocument, RefreshTokenHashSchema, RefreshTokenHashModel} from './refresh.token.hash.model';

import {
	GetRefreshTokenHashInterface,
  CreateRefreshTokenHashInterface, CheckDublicateRefreshTokenIdInterface,
  ReplaceRefreshTokenHashInterface,
  EraseRefreshTokenHashInterface, EraseAllRefreshTokenHashsInterface,
} from './refresh.token.hashs.interface';

import {HashsService} from '../../secondaries/hashs/hashs.service';

@Injectable()
export class RefreshTokenHashsService {
	constructor(
		@InjectConnection(MONGO_FIRST_CONNECT_NAME) protected connection: Connection,
		@InjectModel(RefreshTokenHash.name, MONGO_FIRST_CONNECT_NAME) private refreshTokenHashs: RefreshTokenHashModel,
		private hashsService: HashsService,
	) {}

  public async getRefreshTokenHash(payload: GetRefreshTokenHashInterface): Promise<RefreshTokenHashDocument> {
    return await this.refreshTokenHashs.findOne({
      ...(payload.id?{_id: payload.id}:{}),
			...(payload.refreshTokenId?{refreshToken: payload.refreshTokenId}:{}),
    }, {}, {
      session: payload.session
    });
  }

  public async createRefreshTokenHash(payload: CreateRefreshTokenHashInterface): Promise<RefreshTokenHashDocument> {
    await this.checkDublicateRefreshTokenId({refreshTokenId: payload.refreshTokenId, session: payload.session});
    const [refreshTokenHash] = await this.refreshTokenHashs.create([{
			hash: payload.token, refreshToken: payload.refreshTokenId
		}], {session: payload.session});
		return refreshTokenHash;
  }

  public async checkDublicateRefreshTokenId(payload: CheckDublicateRefreshTokenIdInterface): Promise<boolean> {
    const res = await this.refreshTokenHashs.findOne({
			refreshToken: payload.refreshTokenId,
		}, null, {
			session: payload.session,
		});
		if(res) {
			throw new ConflictException(`Refresh Token MongoDBId "${payload.refreshTokenId}" already exists`);
		}
		return true;
  }

  public async replaceRefreshTokenHash(payload: ReplaceRefreshTokenHashInterface): Promise<RefreshTokenHashDocument> {
    await this.refreshTokenHashs.updateOne(
			{_id: payload.id, refreshToken: payload.refreshTokenId},
			{hash: payload.token},
			{session: payload.session}
		);

    return await this.getRefreshTokenHash({
      id: payload.id,
      refreshTokenId: payload.refreshTokenId,
      session: payload.session,
    });
  }

  public async eraseRefreshTokenHash(payload: EraseRefreshTokenHashInterface): Promise<RefreshTokenHashDocument> {
    await this.refreshTokenHashs.updateOne(
			{_id: payload.id, refreshToken: payload.refreshTokenId},
			{$unset: {hash: ""}},
			{session: payload.session}
		);

    return await this.getRefreshTokenHash({
      id: payload.id,
      refreshTokenId: payload.refreshTokenId,
      session: payload.session,
    });
  }

  public async eraseAllRefreshTokenHashs(payload: EraseAllRefreshTokenHashsInterface): Promise<Array<RefreshTokenHashDocument>> {
    await this.refreshTokenHashs.updateMany(
			{_id: {$in: payload.ids}, refreshToken: {$in: payload.refreshTokenIds}},
			{$unset: {hash: ""}},
			{session: payload.session}
		);

    return await this.refreshTokenHashs.find({
			_id: {$in: payload.ids},
      refreshToken: {$in: payload.refreshTokenIds},
		}, {}, {session: payload.session});
  }
}
