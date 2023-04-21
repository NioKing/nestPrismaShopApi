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
    const productIndex = await this.elasticService.indices.get({
      index
    })
    if (!productIndex) {
      await this.createIndex(index)
    }
    await this.elasticService.create({
      id: uuid.v4(),
      index: index,
      document: body,
    })
  }

  async findAll(index: string) {
    // return await this.elasticService.indices.get({
    //   index
    // })
    let data = await this.elasticService.search({
      index: index
    })
    return data.hits.hits
  }
  
  
}
