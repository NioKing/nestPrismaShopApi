import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as uuid from 'uuid'

@Injectable()
export class SearchService {

  constructor(
    private elasticService: ElasticsearchService,
    private configService: ConfigService
  ) { }


  async createIndex(index: string) {
      return this.elasticService.indices.create({ index })
  }

  async createRecord(index: string, body: any) {
    this.elasticService.create({
      id: uuid.v4(),
      index: index,
      document: body,
    })
  }

  async findAll(index: string) {
    let data = await this.elasticService.search({
      index: index
    })
    return data.hits.hits
  }
  
  async findById(index: string, id: string) {
    let data = await this.elasticService.get({
      index: index,
      id: id
    })
    return data
  }
  
  deleteById(index: string, id: string) {
    return this.elasticService.delete({
      index,
      id,

    })
  }
  
  
}
