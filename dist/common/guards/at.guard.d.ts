import { ExecutionContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import cConfig from '@src/config/common.config';
export declare const blackList: any[];
declare const AtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AtGuard extends AtGuard_base {
    private reflector;
    private readonly commonConfig;
    constructor(reflector: Reflector, commonConfig: ConfigType<typeof cConfig>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
