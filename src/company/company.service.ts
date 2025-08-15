import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BossService } from 'src/boss/boss.service';
import { CompanyRequestDto } from 'src/dto/company.dto';
import { CompanyEntity } from 'src/entitys/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        private readonly bossService: BossService
    ) {}

    async create(company: CompanyRequestDto): Promise<CompanyEntity> {
        const newCompany = this.companyRepository.create(company);

        const boss = await this.bossService.findById(company.boss_id);

        if (!boss) throw new NotFoundException("Boss id not found!");

        newCompany.created_at = new Date();
        newCompany.boss = boss;

        return await this.companyRepository.save(newCompany);
    }
}
