import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MongooseSession, TypeMethodWithSession } from '../../../utils/mongoose.session';
import { HashsService } from '../../../secondaries/hashs/hashs.service';
import { UsersService } from '../../../entries/users/users.service';
import { RefreshTokensService } from '../../../entries/refresh-tokens/refresh.tokens.service';
import { RefreshTokenDocument } from '../../../entries/refresh-tokens/refresh.token.model';
import { RefreshTokenHashsService } from '../../../entries/refresh-token-hashs/refresh.token.hashs.service';
import { CreateRefreshTokenInterface, DeleteAllRefreshTokensInterface, DeleteRefreshTokenInterface, RefreshRefreshTokenInterface, CompareRefreshTokenHashInterface, CheckRefreshTokenInterface } from './mediary.refresh.tokens.interface';
export declare class MediaryRefreshTokensService implements MongooseSession {
    protected connection: Connection;
    private configService;
    private hashsService;
    private usersService;
    private refreshTokensService;
    private refreshTokenHashsService;
    constructor(connection: Connection, configService: ConfigService, hashsService: HashsService, usersService: UsersService, refreshTokensService: RefreshTokensService, refreshTokenHashsService: RefreshTokenHashsService);
    withSession: TypeMethodWithSession;
    checkRefreshToken(payload: CheckRefreshTokenInterface): Promise<RefreshTokenDocument | null>;
    createRefreshToken(payload: CreateRefreshTokenInterface, fn: (payload?: object) => Promise<string>): Promise<RefreshTokenDocument>;
    deleteAllRefreshTokens({ userId }: DeleteAllRefreshTokensInterface): Promise<void>;
    deleteRefreshToken({ userId, refreshTokenId }: DeleteRefreshTokenInterface): Promise<void>;
    refreshRefreshToken(payload: RefreshRefreshTokenInterface): Promise<RefreshTokenDocument>;
    compareRefreshTokenHash(payload: CompareRefreshTokenHashInterface): Promise<boolean>;
}
