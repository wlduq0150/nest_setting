import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "src/user/enums/role.enum";

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();
        if (!req.user) {
            return false;
        }

        const userRole = (req.user as any).userRole;
        if (!userRole) {
            return false;
        }

        const isMatch = this.matchRoles(userRole, roles);
        if (isMatch) {
            return true;
        }

        throw new ForbiddenException(`${userRole}은 접근권한이 없습니다.`);
    }

    private matchRoles(userRole: UserRole, roles: string[]) {
        if (roles.includes(userRole)) {
            return true;
        }

        return false;
    }
}