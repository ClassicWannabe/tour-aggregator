import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerService } from 'src/mailer/mailer.service';
import { CustomConfigService } from '../config/custom-config.service';
import { ConfigModule } from '../config/config.module';
import { EmailRendererModule } from 'src/email-renderer/email-renderer.module';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CustomConfigService],
      useFactory: async (config: CustomConfigService) => ({
        transport: {
          host: config.getOrFail('SMTP_HOST'),
          port: config.getOrFailNumber('SMTP_PORT'),
          secure: config.getOrFailBool('SMTP_SECURE'),
          auth: {
            user: config.getOrFail('SMTP_USER'),
            pass: config.getOrFail('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.getOrFail('SMTP_EMAIL')}>`,
        },
      }),
    }),
    EmailRendererModule,
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
