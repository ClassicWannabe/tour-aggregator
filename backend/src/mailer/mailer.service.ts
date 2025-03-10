import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { I18nService } from 'nestjs-i18n';
import { EmailRendererService } from 'src/email-renderer/email-renderer.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: NestMailerService,
    private readonly emailRendererService: EmailRendererService,
    private readonly i18nService: I18nService,
  ) {}

  async sendVerificationEmail(email: string, code: string) {
    const html = await this.emailRendererService.renderVerifyEmail(code);
    const subject = this.i18nService.t('verify-email.subject');

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
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
