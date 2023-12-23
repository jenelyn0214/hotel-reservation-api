export type IJwtPayload = {
    email: string;
    sub: string;
};
export type IJwtPayloadWithRt = IJwtPayload & {
    refreshToken: string;
};
export type ITokens = {
    access_token: string;
    refresh_token: string;
};
