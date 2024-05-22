import { IsOptional } from "class-validator";
import { CreateUserDto } from "./CreateUserDto.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends CreateUserDto {

    @ApiPropertyOptional()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    password: string;
}
