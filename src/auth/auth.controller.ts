import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthResponseDTO } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() user: AuthLoginDto): Promise<AuthResponseDTO> {
        return await this.authService.login(user);
    }
}
