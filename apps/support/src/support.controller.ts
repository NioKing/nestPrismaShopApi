import { Controller, Get } from '@nestjs/common';
import { SupportService } from './support.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @EventPattern('get.message')
  getMessage(@Payload() data: any) {
    console.log(data);
  }
}
