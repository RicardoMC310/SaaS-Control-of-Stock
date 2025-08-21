import { forwardRef, Module } from '@nestjs/common';
import { BossController } from './boss.controller';
import { BossService } from './boss.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossEntity } from 'src/entitys/boss.entity';
import { CompanyEntity } from 'src/entitys/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    forwardRef(() => EmployeesModule),
    TypeOrmModule.forFeature([BossEntity, CompanyEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET") ?? "",
        signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") }
      })
    }),
  ],
  controllers: [BossController],
  providers: [BossService],
  exports: [BossService]
})
export class BossModule { }
