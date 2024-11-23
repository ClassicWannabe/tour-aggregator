import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class StorageService implements OnModuleInit {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const accessKeyId = this.configService.get<string>('ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('SECRET_ACCESS_KEY');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const region = this.configService.get<string>('S3_REGION');
    const forcePathStyle = this.configService.get<boolean>(
      'S3_FORCE_PATH_STYLE',
    );

    this.bucket = this.configService.get<string>('S3_BUCKET');
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
