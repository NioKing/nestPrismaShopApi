import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { PrismaService } from "../prisma.service";

@Injectable()
export class HealthService extends HealthIndicator {
    constructor(
        private prismaService: PrismaService
    ){
        super()
    }

    async isHealthy(key:string): Promise<HealthIndicatorResult> {
        try {
            await this.prismaService.$queryRaw`SELECT 1`
            return this.getStatus(key, true)
        } catch (error) {
            throw new HealthCheckError(`${key} check failed`, error)
        }
    }
}