import { CacheTTL, Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { HealthService } from "./health.service";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private healthCheckService: HealthService,
    ) { }

    @Get()
    @HealthCheck()
    @CacheTTL(5)
    async readiness() {
        return await this.health.check([async () => await this.healthCheckService.isHealthy('database')])
    }
}