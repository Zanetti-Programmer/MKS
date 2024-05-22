import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "src/Resources/DTO/Auth/Auth.dto";
import { AuthService } from "src/Services/Auth/Auth.service";

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiResponse({
        status: 201,
        description: 'A resposta padrão retorna um Token JWT para uso no sistema',
    })
    @ApiResponse({
        status: 401,
        description: 'Retorna não autorizado caso não informe email e senha validos'
    })
    @Post('/login')
    @UseInterceptors(CacheInterceptor)
    @CacheKey('token')
    @CacheTTL(48 * 3600000)
    async login(@Body() data: AuthDto) {

        const result = await this.authService.login(data.email, data.password);

        return result;
    }
}