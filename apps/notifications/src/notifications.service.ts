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
  
  async sendEmail(email: string, status: string) {
    switch(status) {
      case 'welcome': 
        await this.mailerService.sendMail({
          to: email,
          subject: `Welcome to Shop App, ${email}!`,
          template: './welcoming',
          context: {
            email: 'Username'
          }
        })
        break;
      
    }
  }
  
}
