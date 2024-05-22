import { Module } from "@nestjs/common";
import { AuthController } from "src/Controllers/Auth/Auth.controller";
import { AuthService } from "src/Services/Auth/Auth.service";
import { UserEntity } from "src/Entitys/User/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/Services/Users/User.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => {
            return {
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '48h'
                }
            }
        },
        inject: [ConfigService],
        global: true,
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {

}