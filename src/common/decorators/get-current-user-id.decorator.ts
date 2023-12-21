import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IJwtPayload } from '@src/interfaces';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IJwtPayload;
    return user.sub;
  },
);
