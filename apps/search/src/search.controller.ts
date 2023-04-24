import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { isPublic } from '@app/common/decorators/is-public-route.decorator';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';


interface search {
  index: string
  id?: string
}

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern('get.search')
  async findAll(@Payload() data: search) {
    return await this.searchService.findAll(data.index)
  }

  @EventPattern('create.record')
  createRecord(@Payload() data: any) {
    return this.searchService.createRecord(data.index, data.body)
  }

  @MessagePattern('get.search.by.id')
  getSearchById(@Payload() data: search) {
    return this.searchService.findById(data.index, data.id)
  }

  @EventPattern('delete.record')
  deleteRecord(@Payload() data: search) {
    return this.searchService.deleteById(data.index, data.id)
  }
}
