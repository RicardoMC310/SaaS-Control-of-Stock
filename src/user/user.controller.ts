import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO, RegisterUserDTO, UserDto } from 'src/DTOs/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser(): UserDto[] {
        return this.userService.getUsers();
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: LoginUserDTO): { token: string } {
        this.userService.validateEmail(user.email);
        this.userService.validatePassword(user.password);

        return this.userService.login(user);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() user: RegisterUserDTO): void {
        this.userService.validateName(user.name);
        this.userService.validateEmail(user.email);
        this.userService.validatePassword(user.password);

        this.userService.register(user);
    }
}
