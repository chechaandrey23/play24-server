declare const _default: (() => {
    jwtAccessSecret: string;
    jwtAccessExpirationTime: number;
    jwtRefreshSecret: string;
    jwtRefreshExpirationTime: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtAccessSecret: string;
    jwtAccessExpirationTime: number;
    jwtRefreshSecret: string;
    jwtRefreshExpirationTime: number;
}>;
export default _default;
