import { IsEnum, IsString, MinLength } from "class-validator";
import { FilmGenreTypes } from "./enum/GenreTypes.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFilmDto {

    @ApiProperty({
        description: "Nome do Filme, deve ter ao minimo 5 caracteres e deve ser uma string",
        example: "Vingadores",
    })
    @IsString({
        message: "Insira um titulo válido para o filme",
    })

    @MinLength(5, {
        message: "Insira um titulo válido para o filme",
    })
    name: string;

    @ApiProperty({
        description: "Genêro do filme, aceita apenas valores de um ENUM",
        example: "action",
        enum: [
            "action",
            "adventure",
            "fiction",
            "terror",
            "drama",
            "comedy"
        ]
    })
    @IsEnum(FilmGenreTypes, {
        message: "Informe um gênero de filme válido para o filme",
    })
    genre: string;

    @ApiProperty({
        description: "Sinopse do filme, deve ter no mínimo 10 caracteres, é o resumo do filme, basicamente",
        example: "Loki, o irmão de Thor, ganha acesso ao poder ilimitado do cubo cósmico ao roubá-lo de dentro das instalações da S.H.I.E.L.D. Nick Fury, o diretor desta agência internacional que mantém a paz, logo reúne os únicos super-heróis que serão capazes de defender a Terra de ameaças sem precedentes. Homem de Ferro, Capitão América, Hulk, Thor, Viúva Negra e Gavião Arqueiro formam o time dos sonhos de Fury, mas eles precisam aprender a colocar os egos de lado e agir como um grupo em prol da humanidade.",
    })
    @MinLength(10, {
        message: "Insira uma sinopse válida para o filme",
    })
    sinopse: string;

}