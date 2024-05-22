import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFilmDto } from "src/Resources/DTO/Films/CreateFilmDto";
import { UpdateFilmDto } from "src/Resources/DTO/Films/UpdateFilmDto";
import { FilmEntity } from "src/Entitys/Films/Film.entity";
import { Repository } from "typeorm";
import { UserService } from "../Users/User.service";
import { DisplayFilmDto } from "src/Resources/DTO/Films/DisplayFilmDto";
import { DisplayUserDto } from "src/Resources/DTO/Users/DisplayUserDto";

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(FilmEntity)
        private readonly filmRepository: Repository<FilmEntity>,
        private readonly userService: UserService
    ) {

    }

    async getFilmsByUser(id: string) {

        const user = await this.userService.getUserById(id);

        if (user) {

            const tratedFilms = user.films.map((film: FilmEntity) => {
                return new DisplayFilmDto(film.id, film.name, film.genre, film.sinopse)
            });

            return tratedFilms;
        }

        throw new UnauthorizedException('Usuário Inválido!');
    }

    async createFilm(data: CreateFilmDto, userId: string) {

        const film = new FilmEntity();

        try {

            const user = await this.userService.getUserById(userId);

            Object.assign(film, { ...data, user } as FilmEntity);

            const newFilm = await this.filmRepository.save(film);

            return new DisplayFilmDto(newFilm.id, newFilm.name, newFilm.genre, newFilm.sinopse,
                new DisplayUserDto(newFilm.user.id, newFilm.user.name))

        }

        catch (err) {
            throw new NotFoundException('Usuário Inválido!')
        }
    }

    async updateFilm(id: string, filmEntity: UpdateFilmDto, userId: string) {
        try {

            await this.updateOrDelete(id, userId, filmEntity);
        }

        catch (err) {
            throw new NotFoundException('Filme Inválido!');
        }

    }

    async deleteFilm(id: string, userId: string) {
        try {
            await this.updateOrDelete(id, userId)
        }

        catch (err) {
            throw new NotFoundException('Filme Inválido!');
        }
    }

    private async updateOrDelete(id: string, userId: string, data: UpdateFilmDto | undefined = undefined) {
        const film = await this.getFilmById(userId, id);

        if (typeof data === 'undefined') {
            return await this.filmRepository.delete(film.id);
        } return await this.filmRepository.update(film.id, data);
    }

    private async getFilmById(id: string, filmId: string) {
        const user = await this.userService.getUserById(id);

        if (user) {
            const film = await this.filmRepository.findOne({
                where: {
                    id: filmId,
                },
                relations: { user: true }
            });

            if (film?.user.id === id) {
                return film;
            }
        }

        throw new UnauthorizedException('Usuário Inválido!');
    }

}