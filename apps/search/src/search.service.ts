import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as uuid from 'uuid'

@Injectable()
export class SearchService {

  constructor(
    private elasticService: ElasticsearchService,
    private configService: ConfigService,
    private prismaService: PrismaService
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
    // // let data = await this.elasticService.search({
    // //   index,
    // //   q: `dbId:${33}`
    // //   // query: {
    // //   //   match: {
    // //   //     "dbId": 33
    // //   //   }
    // //   // }
    // // })
    // // console.log(data.hits.hits.map(v => v._id).toString())
    // let products = await this.prismaService.product.findMany()
    // for (let product in products) {
    // //   let el = await this.elasticService.bulk({
    // //   index: index,
    // //   operations: [{
    // //     create: {
    // //       _id: uuid.v4(),
    // //       _index: index,
    // //       body: product
    // //     }
    // //   }
    // //   ]
    // // })
    // // console.log(el)
    // let d = await this.elasticService.create({
    //   id: uuid.v4(),
    //   index: index,
    //   document: product
    // })
    // console.log(d)
    // }


    return this.elasticService.get({
      index: index,
      id: id,
      
    })
  }
  
  deleteById(index: string, id: string) {
    return this.elasticService.delete({
      index,
      id,

    })
  }
  
  // @Cron(CronExpression.EVERY_10_SECONDS)
  async searchSync() {
    let index = 'products'
    // await this.elasticService.deleteByQuery({
    //   index,
    //   query: {
    //     match_all: {}
    //   }
    // })
    let products = await this.prismaService.product.findMany()
    let p = await this.elasticService.search({
      index,
      
    })
  //   for (let product of products) {
  //   return await this.createRecord(index, product)
  // } 
  for (let i = 0; i < products.length; i++) {
    
    // await this.createRecord(index, products[i])
    
    // console.log(products[i])
  }

}
  
}
