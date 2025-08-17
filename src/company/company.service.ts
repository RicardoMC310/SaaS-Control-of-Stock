import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { BossService } from 'src/boss/boss.service';
import { CompanyRequestDto } from 'src/dto/company.dto';
import { CompanyEntity } from 'src/entitys/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        private readonly bossService: BossService,
        private readonly configService: ConfigService
    ) { }

    createHashCnpj(cnpj: string): string {
        const secret: string | undefined = this.configService.get<string>("SECRET_KEY");

        if (!secret) {
            throw new BadGatewayException('Secret key not found');
        }

        return createHash("sha256").update(secret + cnpj).digest("hex");
    }

    async create(company: CompanyRequestDto): Promise<CompanyEntity> {
        const foundCompany = await this.companyRepository.findOne({
            where: [{ cnpj: this.createHashCnpj(company.cnpj), name: company.name }]
        })

        if (foundCompany) {
            throw new BadGatewayException("Company already exists!");
        }

        const newCompany = this.companyRepository.create(company);

        const boss = await this.bossService.findById(company.boss_id);

        if (!boss) throw new NotFoundException("Boss id not found!");

        newCompany.created_at = new Date();
        newCompany.boss = boss;
        newCompany.cnpj = this.createHashCnpj(company.cnpj);

        return await this.companyRepository.save(newCompany);
    }
}
