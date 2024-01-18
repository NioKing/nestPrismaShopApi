import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka, ClientRMQ } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(
        @Inject('HEALTH_MICROSERVICE') private client: ClientRMQ
    ) { }
      
    @Get()
    @HealthCheck()
    @CacheTTL(5)
    async readiness() {
        return this.client.send('get.health.check', '')
    }
    
}