import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../dto/role.enum';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]
        )
        if (!roles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if (roles.includes(user.role)) {
            return true
        } else {
            throw new ForbiddenException('Access denied!')
        }
    }
}