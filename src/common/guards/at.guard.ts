import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import cConfig from '@src/config/common.config';
import { validateAPIHash } from '@src/util/api-hasher';

export const blackList = [];

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(cConfig.KEY)
    private readonly commonConfig: ConfigType<typeof cConfig>,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const apiKey = request?.headers['x-api-key'];
    const apiHash = request?.headers['x-api-hash'];

    const checkApiKey = validateAPIHash(
      {
        apiKey: this.commonConfig.apiKey,
        data: request?.body || {},
        params: request?.query || {},
      },
      apiHash,
    );

    if (!apiKey) return false;
    if (apiKey !== this.commonConfig.apiKey) return false;
    if (this.commonConfig.secured === 'true') {
      if (!checkApiKey) return false;
    }

    if (isPublic) return true;

    const accessToken = request?.headers?.authorization?.replace('Bearer ', '');

    if (blackList.includes(accessToken)) {
      console.log('blocked - ', accessToken);
      return false;
    }

    if (request.route.path.includes('auth/logout')) {
      blackList.push(accessToken);
    }

    return super.canActivate(context);
  }
}
