import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('send.welcome.email')
  sendWelcomeEmail(@Payload() email: string) {
    return this.notificationsService.sendEmail(email, 'welcome')
  }

}
