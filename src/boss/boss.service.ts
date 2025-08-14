import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BossDto, BossResponseDto } from 'src/dto/boss.dto';
import { BossEntity } from 'src/entitys/boss.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BossService {
    constructor(
        @InjectRepository(BossEntity)
        private readonly bossRepository: Repository<BossEntity>,
        private readonly configService: ConfigService
    ) { }

    createhashCpf(cpf: string): string {
        const secret = this.configService.get<string>('SECRET_KEY');
        if (!secret) {
            throw new BadGatewayException('Secret key not found');
        }
        return createHash('sha256')
            .update(cpf + secret)
            .digest('hex');
    }

    async create(boss: BossDto): Promise<BossEntity> {
        const existingBoss = await this.bossRepository.findOne({
            where: [{ cpf: this.createhashCpf(boss.cpf) }, { email: boss.email }]
        });

        if (existingBoss) {
            throw new BadGatewayException('Boss with this CPF or email already exists');
        }

        const newBoss = this.bossRepository.create({
            ...boss,
            cpf: this.createhashCpf(boss.cpf),
            password: hashSync(boss.password, 14)
        });

        return this.bossRepository.save(newBoss);
    }

    async findByEmail(email: string): Promise<BossResponseDto | null> {
        const boss = await this.bossRepository.findOne({
            where: { email: email.trim().toLowerCase() }
        });

        if (!boss) {
            throw new NotFoundException("Boss not found with this email");
        }

        return {
            name: boss?.name,
            email: boss?.email,
            password: boss?.password
        };
    }
}
