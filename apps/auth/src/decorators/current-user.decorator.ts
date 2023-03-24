import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToRpc().getData()
    return request
})