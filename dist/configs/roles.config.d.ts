export declare const ROLE_ADMIN_VALUE = 100;
export declare const ROLE_USER_VALUE = 10;
export declare const ROLE_GUEST_VALUE = 1;
export type RoleInterface = number;
export type RolesInterface = {
    [key: string]: RoleInterface;
};
export type DefaultRolesInterface = Array<RoleInterface>;
declare const _default: (() => {
    roles: RolesInterface;
    names: {
        admin: string;
        user: string;
        guest: string;
    };
    defaultMaxRoles: number;
    defaultRoles: DefaultRolesInterface;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    roles: RolesInterface;
    names: {
        admin: string;
        user: string;
        guest: string;
    };
    defaultMaxRoles: number;
    defaultRoles: DefaultRolesInterface;
}>;
export default _default;
