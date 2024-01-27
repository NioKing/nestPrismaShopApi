import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUserWS = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToWs().getClient()
    return request ? request['id'] : undefined
})