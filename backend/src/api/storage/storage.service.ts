import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MemoryStoredFile } from 'nestjs-form-data';
import { CustomConfigService } from '../../config/custom-config.service';

@Injectable()
export class StorageService implements OnModuleInit {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configService: CustomConfigService) {}

  onModuleInit() {
    const accessKeyId = this.configService.getOrFail<string>('ACCESS_KEY_ID');
    const secretAccessKey =
      this.configService.getOrFail<string>('SECRET_ACCESS_KEY');
    const endpoint = this.configService.getOrFail<string>('S3_ENDPOINT');
    const region = this.configService.getOrFail<string>('S3_REGION');
    const forcePathStyle = this.configService.getOrFail<boolean>(
      'S3_FORCE_PATH_STYLE',
    );

    this.bucket = this.configService.getOrFail<string>('S3_BUCKET');
    this.s3 = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint,
      region,
      forcePathStyle, // needed for MinIO
    });
  }

  async uploadFile(file: MemoryStoredFile) {
    const fileName = Buffer.from(file.originalName, 'latin1').toString('utf8'); // support for non-english characters https://github.com/expressjs/multer/issues/1104
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: `${Date.now()}-${fileName}`,
      Body: file.buffer,
      ContentType: file.mimeType,
    });

    return this.s3.send(command);
  }
}
