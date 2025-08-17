import { IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator";
import { EmployeesRules } from "src/entitys/employees.entity";
import { IsCPF } from "src/utils/typeDto.validator";

export class EmployeesCreateDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z0-9_\.\s]+$/, { message: 'Name can only contain letters and spaces' })
    name: string;

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
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~])(?!.*[\s]).{8,}$/, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsCPF()
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
        message: 'CPF must be in the format XXX.XXX.XXX-XX',
        context: {
            pattern: 'XXX.XXX.XXX-XX'
        }
    })
    cpf: string;

    @IsNotEmpty()
    @IsEnum(EmployeesRules)
    rules: EmployeesRules;    

}

export class EmployeesResponseDto {
    name: string;
    cpf: string;
    id: number;
    rules: EmployeesRules;
    email: string;
    password: string;
}