import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ObjectIdentifier,
  PutObjectTaggingCommand,
  DeleteObjectTaggingCommand,
  Tag,
} from '@aws-sdk/client-s3';
import { CustomConfigService } from 'src/config/custom-config.service';

interface UploadFileParams {
  file: Buffer;
  mimeType: string;
  key: string;
}

type LowercaseTag = { [key in keyof Tag as Lowercase<keyof Tag>]: Tag[key] };

interface AddFileTagParams {
  key: string;
  tags: LowercaseTag[];
}

@Injectable()
export class StorageService implements OnModuleInit {
  private s3: S3Client;
  private bucket: string;
  private endpoint: string;
  private publicEndpoint?: string;

  constructor(private readonly configService: CustomConfigService) {}

  onModuleInit() {
    const accessKeyId = this.configService.getOrFail('ACCESS_KEY_ID');
    const secretAccessKey = this.configService.getOrFail('SECRET_ACCESS_KEY');
    this.endpoint = this.configService.getOrFail('S3_ENDPOINT');
    this.publicEndpoint = this.configService.get<string>('S3_PUBLIC_ENDPOINT');
    const region = this.configService.getOrFail('S3_REGION');
    const forcePathStyle = this.configService.getOrFailBool(
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
    return `${this.publicEndpoint ?? this.endpoint}/${this.bucket}`;
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

  async addFileTag(params: AddFileTagParams) {
    const tags: Tag[] = params.tags.map((tag) => ({
      Key: tag.key,
      Value: tag.value,
    }));
    const command = new PutObjectTaggingCommand({
      Bucket: this.bucket,
      Key: params.key,
      Tagging: { TagSet: tags },
    });

    return this.s3.send(command);
  }

  async deleteFileTag(key: string) {
    const command = new DeleteObjectTaggingCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return this.s3.send(command);
  }
}
