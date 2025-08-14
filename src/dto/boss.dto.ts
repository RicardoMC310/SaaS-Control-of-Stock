import { IsNotEmpty, IsString, Matches } from "class-validator";

export class BossDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain letters and spaces' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~])(?!.*[\s]).{8,}$/, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, {
        message: 'CPF must be in the format XXX.XXX.XXX-XX',
        context: {
            pattern: 'XXX.XXX.XXX-XX'
        }
    })
    cpf: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s@]+@[a-zA-Z0-9]+(\.+[a-zA-Z]{2,})$/, {
        message: 'Email must be a valid email address',
        context: {
            pattern: 'exemplo@gmail.com'
        }
    })
    email: string;
}

export class BossSearchDto {
    name: string;
    email: string;
}