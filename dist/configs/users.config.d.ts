declare const _default: (() => {
    defaultUsers: {
        username: string;
        password: string;
        roles: number[];
    }[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    defaultUsers: {
        username: string;
        password: string;
        roles: number[];
    }[];
}>;
export default _default;
