import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { FilmService } from './../../Services/Films/Film.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateFilmDto } from "src/Resources/DTO/Films/CreateFilmDto";
import { UpdateFilmDto } from 'src/Resources/DTO/Films/UpdateFilmDto';
import { AuthGuard, RequestWithUser } from 'src/Guards/Auth.guard';
import { UserService } from 'src/Services/Users/User.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('films')
@UseGuards(AuthGuard)
@Controller('/films')
export class FilmsController {

    constructor(
        private readonly filmService: FilmService,
        private readonly userService: UserService
    ) { }
    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, retorna uma lista de filmes pertecentes ao usuario do token.'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheKey('films')
    async getAllFilmsByUser(@Req() request: RequestWithUser) {

        const films = await this.filmService.getFilmsByUser(request.user.sub);

        return films;
    }

    @Post('/create')
    @ApiResponse({
        status: 201,
        description: 'Ao informar um token valido, cria um filme para o usuário informado pelo token.'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    async create(@Body() data: CreateFilmDto, @Req() request: RequestWithUser) {

        const film = await this.filmService.createFilm(data, request.user.sub);

        return {
            message: "Sucessfully created",
            film: film
        }

    }

    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, atualiza um filme pertecente ao usuário do token, baseado no id informado.'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @Put('/update/:id')
    async update(@Body() data: UpdateFilmDto, @Param('id') id: string, @Req() request: RequestWithUser) {
        await this.filmService.updateFilm(id, data, request.user.sub);

        return {
            message: "Usuário Atualizado com Sucesso"
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, exclui um filme pertecente ao usuário do token, baseado no id informado.'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Req() request: RequestWithUser) {
        await this.filmService.deleteFilm(id, request.user.sub);

        return {
            message: "Filme deletado com Sucesso"
        }
    }
}