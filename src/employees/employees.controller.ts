import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmployeesCreateDto } from 'src/dto/employees.dto';
import { EmployeesEntity } from 'src/entitys/employees.entity';

@Controller('employees')
export class EmployeesController {

    constructor(
        private readonly employeesService: EmployeesService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async create(@Body() user: EmployeesCreateDto, @Request() req): Promise<EmployeesEntity> {
        return await this.employeesService.create(user, req["user"].id);
    }

}
