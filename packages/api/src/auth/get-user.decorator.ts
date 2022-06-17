import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) =>{
    let user = ctx.switchToHttp().getRequest().user
    if (data) {
      return user[data];
    }
    return ctx.switchToHttp().getRequest().user;
  },
);
