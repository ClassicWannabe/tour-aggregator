import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './config/config.module';
import { CookieResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CustomConfigService } from 'src/config/custom-config.service';
import { SUPPLIER_JWT_EXPIRES_IN_SECONDS } from 'src/api/suppliers/constants';

@Module({
  imports: [
    ConfigModule,
    ApiModule,
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new CookieResolver([process.env.COOKIE_LOCALE ?? ''])],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: CustomConfigService) {
        return {
          secret: configService.getOrFail('SUPPLIER_JWT_SECRET'),
          signOptions: { expiresIn: SUPPLIER_JWT_EXPIRES_IN_SECONDS },
        };
      },
      inject: [CustomConfigService],
    }),
  ],
})
export class AppModule {}
