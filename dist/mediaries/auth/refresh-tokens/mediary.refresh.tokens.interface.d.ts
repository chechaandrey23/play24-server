import { ClientSession } from 'mongoose';
export interface CreateRefreshTokenInterface {
    userId: string;
    refreshTokenLifetime: number;
    userAgent: string;
    ip: string;
}
export interface DeleteAllRefreshTokensInterface {
    userId: string;
}
export interface DeleteRefreshTokenInterface {
    userId: string;
    refreshTokenId: string;
}
export interface RefreshRefreshTokenInterface {
    userId: string;
    refreshTokenId: string;
    newRefreshToken: string;
    cookieRefreshToken: string;
    refreshTokenLifetime: number;
    userAgent: string;
    ip: string;
}
export interface CompareRefreshTokenHashInterface {
    refreshTokenId: string;
    token: string;
    session: ClientSession;
}
export interface CheckRefreshTokenInterface {
    userId: string;
    refreshTokenId: string;
    cookieRefreshToken: string;
}
