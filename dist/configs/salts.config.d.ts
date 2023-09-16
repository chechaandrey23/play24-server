export interface SaltInterface {
    rounds: number;
    secretStart: string;
    secretEnd: string;
}
export type SaltsInterface = {
    [key: string]: SaltInterface;
};
declare const _default: (() => {
    salts: SaltsInterface;
    names: {
        password: string;
        refreshToken: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    salts: SaltsInterface;
    names: {
        password: string;
        refreshToken: string;
    };
}>;
export default _default;
