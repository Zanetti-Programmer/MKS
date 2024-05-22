import { IsOptional } from "class-validator";
import { CreateFilmDto } from "./CreateFilmDto";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateFilmDto extends CreateFilmDto {


    @ApiPropertyOptional()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    genre: string;

    @ApiPropertyOptional()
    @IsOptional()
    sinopse: string;
}