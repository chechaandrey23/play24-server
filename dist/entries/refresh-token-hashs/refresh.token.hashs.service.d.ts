import { Connection } from 'mongoose';
import { RefreshTokenHashDocument, RefreshTokenHashModel } from './refresh.token.hash.model';
import { GetRefreshTokenHashInterface, CreateRefreshTokenHashInterface, CheckDublicateRefreshTokenIdInterface, ReplaceRefreshTokenHashInterface, EraseRefreshTokenHashInterface, EraseAllRefreshTokenHashsInterface } from './refresh.token.hashs.interface';
import { HashsService } from '../../secondaries/hashs/hashs.service';
export declare class RefreshTokenHashsService {
    protected connection: Connection;
    private refreshTokenHashs;
    private hashsService;
    constructor(connection: Connection, refreshTokenHashs: RefreshTokenHashModel, hashsService: HashsService);
    getRefreshTokenHash(payload: GetRefreshTokenHashInterface): Promise<RefreshTokenHashDocument>;
    createRefreshTokenHash(payload: CreateRefreshTokenHashInterface): Promise<RefreshTokenHashDocument>;
    checkDublicateRefreshTokenId(payload: CheckDublicateRefreshTokenIdInterface): Promise<boolean>;
    replaceRefreshTokenHash(payload: ReplaceRefreshTokenHashInterface): Promise<RefreshTokenHashDocument>;
    eraseRefreshTokenHash(payload: EraseRefreshTokenHashInterface): Promise<RefreshTokenHashDocument>;
    eraseAllRefreshTokenHashs(payload: EraseAllRefreshTokenHashsInterface): Promise<Array<RefreshTokenHashDocument>>;
}
