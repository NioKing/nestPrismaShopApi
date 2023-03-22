import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";


@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],
    })
    private readonly producer: Producer = this.kafka.producer()

    async onModuleInit() {
        await this.producer.connect()
    }

    async produce(redord: ProducerRecord) {
        await this.producer.send(redord)
    }

    async onApplicationShutdown() {
        await this.producer.disconnect()
    }
}