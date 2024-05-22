import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard, RequestWithUser } from "src/Guards/Auth.guard";
import { CreateUserDto } from "src/Resources/DTO/Users/CreateUserDto.dto";
import { DisplayUserDto } from "src/Resources/DTO/Users/DisplayUserDto";
import { UpdateUserDto } from "src/Resources/DTO/Users/UpdateUserDto.dto";
import { PasswordHashPipe } from "src/Resources/Pipes/PasswordHash.pipe";
import { UserService } from "src/Services/Users/User.service";

@ApiTags('users')
@Controller('/users')
export class UsersController {

    constructor
        (
            private userService: UserService
        ) {

    }

    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, retorna uma lista com todos os usuarios cadastrados'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheKey('users')
    @UseGuards(AuthGuard)
    async getUsers() {
        const users = await this.userService.getUsers();

        return users;
    }

    @ApiResponse({
        status: 201,
        description: 'Retorna de forma simplificicada os dados do usuário, como também uma mensagem de sucesso!'
    })
    @Post('/create')
    async createUser
        (
            @Body() { password, ...data }: CreateUserDto,
            @Body('password', PasswordHashPipe) hashedPassword: string
        ) {
        const user = await this.userService.createUser({ ...data, password: hashedPassword });
        return { status: 'Created User', user: new DisplayUserDto(user.id, user.name, user.films) };
    }

    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, atualiza os dados do usuário informado pelo token'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @UseGuards(AuthGuard)
    @Put('/update')
    async updateUser(@Body() data: UpdateUserDto, @Req() request: RequestWithUser) {
        await this.userService.updateUser(request.user.sub, data);

        return { message: "Usuário Atualizado com Sucesso" }
    }


    @ApiResponse({
        status: 200,
        description: 'Ao informar um token valido, exclui o usuário informado pelo token.'
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna um erro de não autenticado caso informar um token invalido'
    })
    @ApiBearerAuth('KEY_TOKEN')
    @UseGuards(AuthGuard)
    @Delete('/delete')
    async deleteUser(@Req() request: RequestWithUser) {
        await this.userService.deleteUser(request.user.sub);

        return { message: "Usuário deletado com sucesso" }
    }
}