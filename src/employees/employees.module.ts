import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesEntity } from 'src/entitys/employees.entity';
import { BossModule } from 'src/boss/boss.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeesEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET") ?? "",
        signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") }
      })
    }),
    BossModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule { }
