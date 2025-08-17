import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BossService } from 'src/boss/boss.service';
import { AuthLoginDto, AuthResponseDTO } from 'src/dto/auth.dto';
import { compare, compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { EmployeesService } from 'src/employees/employees.service';
import { createHashJWE, extractJWEToHash } from 'src/utils/cripted.hash';
import { EmployeesRules } from 'src/entitys/employees.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly bossService: BossService,
        private readonly employeesService: EmployeesService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async login(user: AuthLoginDto): Promise<AuthResponseDTO> {

        let payload;

        let loginUser: any = await this.bossService.findByEmail(user.email);

        if (!loginUser) {
            loginUser = await this.employeesService.findByEmail(user.email);
            if (!loginUser) {
                throw new BadGatewayException("User not found");
            }
        }

        if (!compareSync(user.password, loginUser?.password)) {
            throw new BadRequestException("Password is not correct!");
        }

        const secret = this.configService.get<string>("SECRET_KEY");
    
        if (!secret) throw new BadGatewayException("Secret key not found!");

        if (user.cpf !== loginUser?.cpf) throw new BadRequestException("CPF not cmbined")

        payload = this.jwtService.sign({
            id: loginUser?.id,
            name: loginUser?.name,
            cpf: loginUser?.cpf,
            email: loginUser?.email,
            rules: loginUser?.rules??EmployeesRules.BOSS
        });

        return {
            token: payload,
            expiresIn: this.configService.get<string>("JWT_EXPIRES_IN")??""
        }

    }
}
