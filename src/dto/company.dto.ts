import { IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator";
import { BossEntity } from "src/entitys/boss.entity";
import { IsCNPJ } from "src/utils/typeDto.validator";

export class CompanyRequestDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z0-9_\.\s]+$/, { message: 'Name can only contain letters and spaces' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/, {
        message: "error cnpj format",
        context: {
            pattern: "XX.XXX.XXX/XXXX-XX"
        }
    })
    @IsCNPJ()
    cnpj: string;
}

export class CompanyGetDto {
    name: string;
    boss: BossEntity;
    cnpj: string;
    created_at: Date;
    id: number;
}