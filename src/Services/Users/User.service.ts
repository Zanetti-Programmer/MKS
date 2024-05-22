import { DisplayFilmDto } from './../../Resources/DTO/Films/DisplayFilmDto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/Resources/DTO/Users/CreateUserDto.dto";
import { UpdateUserDto } from "src/Resources/DTO/Users/UpdateUserDto.dto";
import { UserEntity } from "src/Entitys/User/User.entity";
import { Repository } from "typeorm";
import { DisplayUserDto } from "src/Resources/DTO/Users/DisplayUserDto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {

    }

    async getUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (user) return user;

        throw new NotFoundException('Usuario Inválido!');
    }

    async getUsers() {
        const users = await this.userRepository.find();

        const usersDto = users.map((user) => {
            return new DisplayUserDto(user.id, user.name, user.films.map((film) => {
                return new DisplayFilmDto(film.id, film.name, film.genre, film.sinopse);
            }))
        });

        return usersDto;

    }

    async getUserByEmail(email: string) {
        try {
            return await this.userRepository.findOne({ where: { email: email } });
        } catch (error) {
            throw new NotFoundException('Usuário inválido!');
        }

    }

    async createUser(data: CreateUserDto) {
        const userEntity = new UserEntity();

        Object.assign(userEntity, data as UserEntity);

        return await this.userRepository.save(userEntity);

    }

    async updateUser(id: string, userEntity: UpdateUserDto) {
        try {
            const user = await this.getUserById(id);
            await this.userRepository.update(user.id, userEntity);
        } catch (error) {
            throw new NotFoundException('Usuário Inválido!');
        }

    }

    async deleteUser(id: string) {
        try {
            const user = await this.getUserById(id);
            await this.userRepository.delete(user.id);
        } catch (error) {
            throw new NotFoundException('Usuário Inválido!');
        }

    }
}