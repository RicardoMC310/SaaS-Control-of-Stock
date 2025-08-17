import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BossService } from 'src/boss/boss.service';
import { CompanyGetDto, CompanyRequestDto } from 'src/dto/company.dto';
import { createHashCnpj, extractCnpjToHash } from 'src/utils/cripted.hash';
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

    

    async create(company: CompanyRequestDto): Promise<CompanyEntity> {
        const secret = this.configService.get<string>("SECRET_KEY");

        const foundCompany = await this.companyRepository.findOne({
            where: [{ cnpj: await createHashCnpj(company.cnpj, secret??""), name: company.name }]
        })

        if (foundCompany) {
            throw new BadGatewayException("Company already exists!");
        }

        const newCompany = this.companyRepository.create(company);

        const boss = await this.bossService.findById(company.boss_id);

        if (!boss) throw new NotFoundException("Boss id not found!");

        newCompany.created_at = new Date();
        newCompany.boss = boss;
        newCompany.cnpj = await createHashCnpj(company.cnpj, secret??"");

        return await this.companyRepository.save(newCompany);
    }

    async foundByName(name: string): Promise<CompanyGetDto> {
        const secret = this.configService.get<string>("SECRET_KEY");

        const foundCompany = await this.companyRepository.findOne({
            where: { name },
            relations: ["boss"], // garante que boss seja carregado
        });

        if (!foundCompany) throw new NotFoundException("Company not found");

        return {
            id: foundCompany.id,
            name: foundCompany.name,
            cnpj: await extractCnpjToHash(foundCompany.cnpj, secret??""),
            created_at: foundCompany.created_at,
            boss: foundCompany.boss,
        };
    }

}
