import { isPublic } from "@app/common/decorators/is-public-route.decorator";
import { Controller, Get, Inject, OnModuleInit, Param } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('search')
@Controller('search')
export class SearchController implements OnModuleInit {

    constructor(
        @Inject('SEARCH_MICROSERVICE') private readonly client: ClientKafka
    ) { }

    async onModuleInit() {
        this.client.subscribeToResponseOf('get.search')
        this.client.subscribeToResponseOf('get.search.by.id')
        await this.client.connect()
    }

    @isPublic()
    @Get(':index')
    search(@Param() index: string) {
        return this.client.send('get.search', index)
    }


    @isPublic()
    @Get(':index/:id')
    searchById(@Param() index: object, @Param() id: string) {
        return this.client.send('get.search.by.id', index)
    }
    
}