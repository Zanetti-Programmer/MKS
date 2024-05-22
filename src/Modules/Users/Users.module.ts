import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "src/Controllers/Users/Users.controller";
import { UserService } from "src/Services/Users/User.service";
import { UserEntity } from "src/Entitys/User/User.entity";
import { EmailIsUnique } from "src/Resources/Validator/Users/EmailIsUnique.validator";
import { FilmEntity } from "src/Entitys/Films/Film.entity";
import { AuthService } from "src/Services/Auth/Auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FilmEntity])],
    controllers: [UsersController],
    providers: [UserService, EmailIsUnique, AuthService],
})
export class UserModule {

}