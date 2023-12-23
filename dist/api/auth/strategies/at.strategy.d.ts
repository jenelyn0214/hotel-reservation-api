import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@src/interfaces';
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: IJwtPayload): IJwtPayload;
}
export {};
