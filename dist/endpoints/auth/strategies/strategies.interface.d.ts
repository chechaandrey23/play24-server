export interface ExpressUser {
    id: string;
    refreshTokenId: string;
    roles: Array<number>;
}
export interface ExpressUserAccessToken {
    id: string;
    roles: Array<number>;
}
export interface ExpressUserRefreshToken extends ExpressUserAccessToken {
    refreshTokenId: string;
}
