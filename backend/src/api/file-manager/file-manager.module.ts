import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
