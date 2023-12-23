declare const _default: (() => {
    port: number;
    isProduction: boolean;
    apiKey: string;
    secured: string;
    jwt: {
        accessTokenSecret: string;
        refreshTokenSecret: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    isProduction: boolean;
    apiKey: string;
    secured: string;
    jwt: {
        accessTokenSecret: string;
        refreshTokenSecret: string;
    };
}>;
export default _default;
