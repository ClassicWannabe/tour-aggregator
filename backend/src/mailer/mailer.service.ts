import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { I18nService } from 'nestjs-i18n';
import { EmailRendererService } from 'src/email-renderer/email-renderer.service';
import { CustomConfigService } from 'src/config/custom-config.service';

@Injectable()
export class MailerService implements OnModuleInit {
  private frontendUrl: string;
  constructor(
    private readonly mailerService: NestMailerService,
    private readonly emailRendererService: EmailRendererService,
    private readonly i18nService: I18nService,
    private readonly configService: CustomConfigService,
  ) {}

  onModuleInit() {
    this.frontendUrl = this.configService.getOrFail('SMTP_FRONTEND_URL');
  }

  async sendVerificationEmail(email: string, code: string) {
    const verifyUrl = this.getVerificationEmailUrl(email, code);
    const html = await this.emailRendererService.renderVerifyEmail(verifyUrl);
    const subject = this.i18nService.t('verify-email.subject');

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

  private getVerificationEmailUrl(email: string, code: string): string {
    const encodedEmail = encodeURIComponent(email);
    return `${this.frontendUrl}/ru/verify-email?email=${encodedEmail}&code=${code}`;
  }

  async sendClientTourReservationEmail(
    email: string,
    tourDates: {
      startDate: Date;
      endDate: Date;
    },
  ) {
    const html =
      await this.emailRendererService.renderClientTourReservation(tourDates);
    const subject = this.i18nService.t('client-tour-reservation.subject');

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

  async sendSupplierTourReservation(
    email: string,
    tourDates: {
      startDate: Date;
      endDate: Date;
    },
    clientInfo: { name: string; phone: string; email: string },
  ) {
    const html = await this.emailRendererService.renderSupplierTourReservation(
      tourDates,
      clientInfo,
    );
    const subject = this.i18nService.t('supplier-tour-reservation.subject');

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
