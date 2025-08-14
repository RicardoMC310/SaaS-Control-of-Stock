import { Module } from '@nestjs/common';
import { BossController } from './boss.controller';
import { BossService } from './boss.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossEntity } from 'src/entitys/boss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BossEntity])],
  controllers: [BossController],
  providers: [BossService]
})
export class BossModule {}
