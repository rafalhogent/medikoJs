import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { JwtPayload } from '../../auth/models/jwtPayload.type';

export const ExtractCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user?.sub) throw new BadRequestException('User info not found');
    return user.sub;
  },
);
