import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { VerifyEmail } from "src/Resources/Decorators/Users/VerifyEmail.decorator";

export class CreateUserDto {

    /**
     * Nome do usuário, deve conter 3 caracteres ao minimo.
     * @example Eduardo Silveira
     */

    @IsString()
    @MinLength(3, {
        message: "Nome inválido!"
    })
    name: string;

    /**
     * O E-mail do usuário deve ser valido, assim como não pre-existir na base de dados.
     * @example example@gmail.com
     */

    @IsEmail(undefined, {
        message: "Email inválido ou já cadastrado no sistema"
    })
    @VerifyEmail({
        message: "Email inválido ou já cadastrado no sistema"
    })
    email: string;

    /**
     * Senha do usuário, deve ter entre 8 a 30 caracteres, 
     * e seguir um padrão Regex especifico, contendo letras maiusculas, minusculas, numeros e simbolos
     * @example JoaoIsDevIn@2024
     */

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{8,30}$/, {
        message: "Senha inválida"
    })
    password: string;
}