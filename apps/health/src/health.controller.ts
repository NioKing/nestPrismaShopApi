import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckService } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService,
    private health: HealthCheckService,
  ) { }

    @MessagePattern('get.health.check')
    async readiness() {
      return this.health.check([async () => await this.healthService.isHealthy('database')])
    }
}
