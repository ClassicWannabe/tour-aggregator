import { Module } from '@nestjs/common';
import { EmailRendererService } from 'src/email-renderer/email-renderer.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  providers: [EmailRendererService, ConfigModule],
  exports: [EmailRendererService],
})
export class EmailRendererModule {}
