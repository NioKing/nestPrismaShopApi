import { CacheTTL, Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

@Controller('health')
export class HealthController implements OnModuleInit {
    constructor(
        @Inject('HEALTH_MICROSERVICE') private client: ClientKafka
    ) { }
    
    async onModuleInit() {
        this.client.subscribeToResponseOf('get.health.check')
        await this.client.connect()
    }
    
    
    @Get()
    @HealthCheck()
    @CacheTTL(5)
    async readiness() {
        return this.client.send('get.health.check', '')
    }
    
    

    // @Get()
    // @HealthCheck()
    // @CacheTTL(5)
    // async readiness() {
    //     return this.health.check([async () => await this.healthCheckService.isHealthy('database')])
    // }
}