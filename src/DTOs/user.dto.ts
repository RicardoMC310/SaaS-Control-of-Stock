import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum UserRules {
    ADMIN = 'admin',
    CLIENT = 'client',
}

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsEnum(UserRules)
    rules: UserRules;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsDate()
    createdAt: Date;
}

export class RegisterUserDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}