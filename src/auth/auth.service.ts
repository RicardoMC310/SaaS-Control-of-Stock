import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BossService } from 'src/boss/boss.service';
import { AuthLoginDto, AuthResponseDTO, TypeOfLogin } from 'src/dto/auth.dto';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly bossService: BossService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async login(user: AuthLoginDto): Promise<AuthResponseDTO> {
        let payload;

        if (user.type == TypeOfLogin.Boss) {
            const boss = await this.bossService.findByEmail(user.email);

            if (!boss) {
                throw new NotFoundException("Boss not found");
            }

            const match = await compare(user.password, boss.password);

            if (!match) {
                throw new BadRequestException("Password not matches");
            }

            payload = {
                rules: "boss",
                name: boss.name,
                email: boss.email
            };

        }

        return {
            token: this.jwtService.sign(payload),
            expiresIn: this.configService.get<string>("JWT_EXPIRES_IN") ?? " "
        }
    }
}
