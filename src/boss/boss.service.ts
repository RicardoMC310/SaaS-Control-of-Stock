import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BossDto, BossResponseDto } from 'src/dto/boss.dto';
import { BossEntity } from 'src/entitys/boss.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { createHashJWE, extractJWEToHash } from 'src/utils/cripted.hash';

@Injectable()
export class BossService {
    constructor(
        @InjectRepository(BossEntity)
        private readonly bossRepository: Repository<BossEntity>,
        private readonly configService: ConfigService
    ) { }

    async create(boss: BossDto): Promise<BossEntity> {
        const secret = this.configService.get<string>('SECRET_KEY');

        if (!secret) {
            throw new BadGatewayException('Secret key not found');
        }

        const existingBoss = await this.bossRepository.findOne({
            where: [{ cpf: await createHashJWE(boss.cpf, secret) }, { email: boss.email }]
        });

        if (existingBoss) {
            throw new BadGatewayException('Boss with this CPF or email already exists');
        }

        const newBoss = this.bossRepository.create({
            ...boss,
            cpf: await createHashJWE(boss.cpf, secret),
            password: hashSync(boss.password, 14)
        });

        return this.bossRepository.save(newBoss);
    }

    async findById(id: number): Promise<BossEntity | null> {
        return await this.bossRepository.findOne({
            where: { id },
            relations: ["company"], // carrega a relação
        });
    }

    async findByEmail(email: string): Promise<BossResponseDto | null> {
        const secret = this.configService.get<string>('SECRET_KEY');

        if (!secret) {
            throw new BadGatewayException('Secret key not found');
        }

        const boss = await this.bossRepository.findOne({
            where: { email: email.trim().toLowerCase() }
        });

        if (!boss) {
            throw new NotFoundException("Boss not found with this email");
        }

        return {
            id: boss?.id,
            name: boss?.name,
            email: boss?.email,
            password: boss?.password,
            cpf: await extractJWEToHash(boss?.cpf, secret)
        };
    }
}
