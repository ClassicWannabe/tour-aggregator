import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { CustomConfigService } from '../config/custom-config.service';
import { ConfigModule } from '../config/config.module';

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
        template: {
          dir: path.join(__dirname, './templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
