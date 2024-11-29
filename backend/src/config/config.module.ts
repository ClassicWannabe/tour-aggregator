import { CustomConfigService } from './custom-config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [NestConfigModule],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class ConfigModule {}
