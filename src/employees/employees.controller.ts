import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmployeesCreateDto } from 'src/dto/employees.dto';
import { EmployeesEntity, EmployeesRules } from 'src/entitys/employees.entity';

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

    @Delete()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async delete(@Body("id") id: number, @Request() req) {
        if (req["user"].rules === EmployeesRules.BOSS || req["user"].rules === EmployeesRules.ADMIN) {
            await this.employeesService.deleteEmployees(id);
            return;
        }
        
        throw new UnauthorizedException("Your don't have permission");
    }

}
