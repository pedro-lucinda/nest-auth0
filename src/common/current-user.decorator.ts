import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext): unknown => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as Record<string, unknown> | undefined;
    return data ? user?.[data as string] : user;
  },
);
