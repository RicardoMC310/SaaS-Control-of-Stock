import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { BossService } from './boss.service';
import { BossDto, BossResponseDto } from 'src/dto/boss.dto';
import { BossEntity } from 'src/entitys/boss.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boss')
export class BossController {
    constructor(private readonly bossService: BossService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createBoss(@Body() bossDto: BossDto): Promise<BossEntity> {
        return this.bossService.create(bossDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findBossByEmail(@Body('email') email: string): Promise<BossResponseDto | null> {
        return this.bossService.findByEmail(email);
    }

    @Get("whoami")
    @UseGuards(AuthGuard)
    whoami(@Request() req): {user: any} {
        return req.user;
    }
}
