import { Connection } from 'mongoose';
import { RefreshTokenDocument, RefreshTokenModel } from './refresh.token.model';
import { GetRefreshTokenInterface, CountRefreshTokensInterface, CreateRefreshTokenInterface, ReplaceExpiredRefreshTokenInterface, RefreshRefreshTokenInterface, EraseAllRefreshTokensInterface, EraseRefreshTokenInterface, UpdateRefreshTokenHashSetInterface } from './refresh.tokens.interface';
export declare class RefreshTokensService {
    protected connection: Connection;
    private refreshTokens;
    constructor(connection: Connection, refreshTokens: RefreshTokenModel);
    getRefreshToken(payload: GetRefreshTokenInterface): Promise<RefreshTokenDocument>;
    countRefreshTokens(payload: CountRefreshTokensInterface): Promise<number>;
    createRefreshToken(payload: CreateRefreshTokenInterface): Promise<RefreshTokenDocument>;
    replaceExpiredRefreshToken(payload: ReplaceExpiredRefreshTokenInterface): Promise<RefreshTokenDocument>;
    eraseAllRefreshTokens(payload: EraseAllRefreshTokensInterface): Promise<Array<RefreshTokenDocument>>;
    eraseRefreshToken(payload: EraseRefreshTokenInterface): Promise<RefreshTokenDocument>;
    refreshRefreshToken(payload: RefreshRefreshTokenInterface): Promise<RefreshTokenDocument>;
    updateRefreshTokenHashSet(payload: UpdateRefreshTokenHashSetInterface): Promise<boolean>;
}
