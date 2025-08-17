import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BossModule } from 'src/boss/boss.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    BossModule,
    EmployeesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET") ?? "",
        signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") }
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
