
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from '../prisma.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
    imports: [TerminusModule],
    controllers: [HealthController],
    providers: [PrismaService, HealthService],
})
export default class HealthModule { }