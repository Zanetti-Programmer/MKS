import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { AuthPayload, AuthService } from 'src/Services/Auth/Auth.service';

export interface RequestWithUser extends Request {
    user: AuthPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService, private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();

        const token = await this.extractHandleToken(request);

        if (!token) throw new UnauthorizedException('Não foi possivel autenticar o usuario!');

        const redisToken = await this.authService.retrieveRedisToken(token);

        if (!redisToken) throw new UnauthorizedException('Não foi possivel autenticar o usuario!');


        try {
            const payload: AuthPayload = await this.jwtService.verifyAsync(token);
            request.user = payload;
        }
        catch (err) {
            throw new UnauthorizedException('Não foi possivel autenticar o usuario!')
        }

        return true;
    }

    private async extractHandleToken(request: Request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }


}
