import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtPayload, IJwtPayloadWithRt } from '@src/interfaces';
declare const RtStrategy_base: new (...args: any[]) => any;
export declare class RtStrategy extends RtStrategy_base {
    constructor(config: ConfigService);
    validate(req: Request, payload: IJwtPayload): IJwtPayloadWithRt;
}
export {};
