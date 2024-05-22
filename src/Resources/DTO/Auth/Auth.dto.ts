import { IsEmail, IsString } from "class-validator";

export class AuthDto {

    /**
     * Email cadastrado no sistema, nãoa aceita inválidos nem não existentes
     * @example example@gmail.com
     */

    @IsEmail(undefined, {
        message: "Email inválido!"
    })
    email: string;

    /**
     * Senha do usuario cadastrado no sistema
     * @example JoaoIsDevIn@2024
     */

    @IsString()
    password: string;
}