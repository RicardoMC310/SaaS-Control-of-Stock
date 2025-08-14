import { IsEnum, IsNotEmpty, IsNotIn, IsString, Matches } from "class-validator";

export class AuthResponseDTO {
    token: string;
    expiresIn: string;
}

export enum TypeOfLogin {
    Boss = "Boss", Employees = "Employees"
}

export class AuthLoginDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s@]+@[a-zA-Z0-9]+(\.+[a-zA-Z]{2,})$/, {
        message: 'Email must be a valid email address',
        context: {
            pattern: 'exemplo@gmail.com'
        }
    })
    email: string;

    @IsNotEmpty()
    @IsEnum(TypeOfLogin)
    type: TypeOfLogin;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~])(?!.*[\s]).{8,}$/, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    password: string;
}