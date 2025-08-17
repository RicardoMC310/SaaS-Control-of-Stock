import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, hashSync } from 'bcrypt';
import { BossService } from 'src/boss/boss.service';
import { EmployeesCreateDto } from 'src/dto/employees.dto';
import { EmployeesEntity } from 'src/entitys/employees.entity';
import { createHashJWE } from 'src/utils/cripted.hash';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(EmployeesEntity)
        private readonly employeesRepository: Repository<EmployeesEntity>,
        private readonly bossService: BossService,
        private readonly configService: ConfigService
    ) {}

    async create(user: EmployeesCreateDto, boss_id: number): Promise<EmployeesEntity> {
        const secret = this.configService.get<string>("SECRET_KEY");

        if (!secret) throw new BadGatewayException("secret key bot found!");

        let foundUser = await this.employeesRepository.findOne({where: [{
            cpf: await createHashJWE(user.cpf, secret)
        }]});

        if (foundUser) {
            throw new BadGatewayException("User already exists!");
        }

        const bossFound = await this.bossService.findById(boss_id);

        if (!bossFound) {
            throw new NotFoundException("Boss not found!");
        }

        const newUser = this.employeesRepository.create();

        newUser.boss_id = bossFound;
        newUser.company_id = bossFound.company;
        newUser.cpf = await createHashJWE(user.cpf, secret);
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = hashSync(user.password, 14);
        newUser.rules = user.rules;

        return await this.employeesRepository.save(newUser);
    }

}
