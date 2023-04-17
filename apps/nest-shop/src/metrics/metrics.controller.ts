import { isPublic } from "@app/common/decorators/is-public-route.decorator";
import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrometheusController } from "@willsoto/nestjs-prometheus";
import { Response, response } from "express";



@ApiTags('metrics')
@Controller('metrics')
export class MetricsController extends PrometheusController {

    @isPublic()
    @Get()
    index(@Res() response: Response): Promise<string> {
        return super.index(response)
    }
    

}