import { CurrentUser } from '@app/common/auth/decorators/current-user.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationsService {

  constructor(
    private readonly mailerService: MailerService 
  ){}
  

  // @Cron(CronExpression.EVERY_30_SECONDS)
  
  async sendEmail() {
    await this.mailerService.sendMail({
      to: 'xodedit472@cyclesat.com',
      subject: 'Welcome to Shop App!',
      template: './welcoming',
      context: {
        email: 'Username'
      }
    })
  }
  
}
