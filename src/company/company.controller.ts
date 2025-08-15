import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CompanyEntity } from 'src/entitys/company.entity';
import { CompanyRequestDto } from 'src/dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor (
        private readonly companyService: CompanyService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async create(@Body() company: CompanyRequestDto): Promise<CompanyEntity> {
        return await this.companyService.create(company);
    }
}
