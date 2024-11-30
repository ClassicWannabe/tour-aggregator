import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ObjectIdentifier,
} from '@aws-sdk/client-s3';
import { CustomConfigService } from '../../config/custom-config.service';

interface UploadFileParams {
  file: Buffer;
  mimeType: string;
  key: string;
}

@Injectable()
export class StorageService implements OnModuleInit {
  private s3: S3Client;
  private bucket: string;
  private endpoint: string;

  constructor(private readonly configService: CustomConfigService) {}

  onModuleInit() {
    const accessKeyId = this.configService.getOrFail<string>('ACCESS_KEY_ID');
    const secretAccessKey =
      this.configService.getOrFail<string>('SECRET_ACCESS_KEY');
    this.endpoint = this.configService.getOrFail<string>('S3_ENDPOINT');
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
      endpoint: this.endpoint,
      region,
      forcePathStyle, // needed for MinIO
    });
  }

  get baseUrl() {
    return `${this.endpoint}/${this.bucket}`;
  }

  async uploadFile({ file, key, mimeType }: UploadFileParams) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: mimeType,
    });

    return this.s3.send(command);
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });

    return this.s3.send(command);
  }

  async deleteFiles(keys: string[]) {
    const deleteRequests: ObjectIdentifier[] = keys.map((key) => ({
      Key: key,
    }));
    const command = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: { Objects: deleteRequests },
    });

    return this.s3.send(command);
  }
}
