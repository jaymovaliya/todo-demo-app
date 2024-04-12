import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.getBearerToken(request);
        if(!token) {
            return false;
        }
        const user = await this.userService.validateToken(token);
        request.user = user;
        return true;
    }

    getBearerToken(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return null;
        }
        return token;
    }
}
