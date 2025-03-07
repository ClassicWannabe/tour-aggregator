import { Injectable, OnModuleInit } from '@nestjs/common';
import { render } from '@react-email/components';
import React from 'react';
import { I18nService } from 'nestjs-i18n';
import VerifyEmail from 'src/email-renderer/templates/verify-email';
import { LayoutProps } from 'src/email-renderer/templates/layout';
import { CustomConfigService } from 'src/config/custom-config.service';
import ClientTourReservation from 'src/email-renderer/templates/client-tour-reservation';
import SupplierTourReservation from 'src/email-renderer/templates/supplier-tour-reservation';
import { DateTime } from 'luxon';
import { TIMEZONE } from 'src/email-renderer/constants';

@Injectable()
export class EmailRendererService implements OnModuleInit {
  private supportEmail: string;
  private staticBaseUrl: string;
  constructor(
    private readonly i18nService: I18nService,
    private readonly configService: CustomConfigService,
  ) {}

  onModuleInit() {
    this.supportEmail = this.configService.getOrFail('SUPPORT_EMAIL');
    this.staticBaseUrl = this.configService.getOrFail('EMAIL_STATIC_BASE_URL');
  }

  async renderVerifyEmail(verifyLink: string) {
    const title = this.i18nService.t('verify-email.title');
    const hello = this.i18nService.t('common.hello');
    const text = this.i18nService.t('verify-email.text');
    const buttonText = this.i18nService.t('verify-email.buttonText');
    const layoutProps = this.getLayoutProps();

    return render(
      <VerifyEmail
        text={text}
        hello={hello}
        verifyLink={verifyLink}
        buttonText={buttonText}
        layoutProps={{ ...layoutProps, title }}
      />,
    );
  }

  async renderClientTourReservation(tourDates: {
    startDate: Date;
    endDate: Date;
  }) {
    const title = this.i18nService.t('client-tour-reservation.title');
    const hello = this.i18nService.t('common.hello');
    const formattedTourDates = {
      startDate: this.formatDate(tourDates.startDate),
      endDate: this.formatDate(tourDates.endDate),
    };
    const text = this.i18nService.t('client-tour-reservation.text', {
      args: formattedTourDates,
    });
    const layoutProps = this.getLayoutProps();

    return render(
      <ClientTourReservation
        text={text}
        hello={hello}
        layoutProps={{ ...layoutProps, title }}
      />,
    );
  }

  async renderSupplierTourReservation(
    tourDates: {
      startDate: Date;
      endDate: Date;
    },
    clientInfo: { name: string; phone: string; email: string },
  ) {
    const title = this.i18nService.t('supplier-tour-reservation.title');
    const hello = this.i18nService.t('common.hello');
    const formattedTourDates = {
      startDate: this.formatDate(tourDates.startDate),
      endDate: this.formatDate(tourDates.endDate),
    };
    const text = this.i18nService.t('supplier-tour-reservation.text', {
      args: formattedTourDates,
    });
    const clientInfoIntro = this.i18nService.t(
      'supplier-tour-reservation.clientInfoIntro',
    );
    const layoutProps = this.getLayoutProps();

    return render(
      <SupplierTourReservation
        text={text}
        hello={hello}
        clientInfo={{ ...clientInfo, intro: clientInfoIntro }}
        layoutProps={{ ...layoutProps, title }}
      />,
    );
  }

  private getLayoutProps(): LayoutProps {
    const warning = this.i18nService.t('common.warning');
    const supportTitle = this.i18nService.t('common.support.title');
    const supportText = this.i18nService.t('common.support.text');

    return {
      warning,
      staticBaseUrl: this.staticBaseUrl,
      support: {
        title: supportTitle,
        text: supportText,
        email: this.supportEmail,
      },
    };
  }

  private formatDate(date: Date) {
    const datetime = DateTime.fromJSDate(date).setZone(TIMEZONE);

    return datetime.toFormat('dd.MM.yyyy HH:mm');
  }
}
