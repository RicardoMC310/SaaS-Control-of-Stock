import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/entitys/company.entity';
import { BossEntity } from 'src/entitys/boss.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BossModule } from 'src/boss/boss.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, BossEntity]),
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
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }
