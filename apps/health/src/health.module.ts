import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [
    TerminusModule
  ],
  controllers: [HealthController],
  providers: [HealthService, PrismaService],
})
export class HealthModule {}
