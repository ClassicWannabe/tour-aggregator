import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendVerificationEmail(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Код подтверждения почты',
      template: './verification',
      context: {
        code,
      },
    });
  }
}
