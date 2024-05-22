import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { UserEntity } from "src/Entitys/User/User.entity";
import { UserService } from "../Users/User.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

export interface AuthPayload {
    sub: string;
    name: string;
}


@Injectable()
export class AuthService {
    constructor
        (
            private readonly userService: UserService,
            private readonly jwtService: JwtService,
            @Inject(CACHE_MANAGER) private cacheManager: Cache
        ) {

    }
    async login(email: string, password: string) {

        const user = await this.userService.getUserByEmail(email);

        if (user) {
            const result = await compare(password, user.password);

            if (result) {
                const payload: AuthPayload = {
                    sub: user.id,
                    name: user.name
                };

                const token = await this.jwtService.signAsync(payload)

                await this.storeToken(token);

                return {
                    token: token
                }

            }

        }

        throw new UnauthorizedException('Usuario não autorizado!');
    }

    async storeToken(token) {
        await this.cacheManager.set(
            token,
            {
                token: token
            },
            48 * 3600000
        )
    }

    async retrieveRedisToken(token: string): Promise<boolean> {
        const value = await this.cacheManager.get<{ token?: string }>(token);

        return value ? true : false;
    }
}