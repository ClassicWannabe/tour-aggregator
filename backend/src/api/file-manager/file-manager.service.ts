import crypto from 'crypto';
import sharp from 'sharp';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { CustomConfigService } from '../../config/custom-config.service';
import { StorageService } from '../storage/storage.service';
import { COMPRESS_OPTIONS } from './constants';

enum PhotoType {
  ORIGINAL = 'original',
  MEDIUM = 'medium',
  PREVIEW = 'preview',
}

interface PhotoKeyParts {
  supplierId: string;
  photoType: PhotoType;
  extension: string;
  uuid: string;
}

interface FileKeyParts {
  supplierId: string;
  extension: string;
  name: string;
}

interface UploadPhotoParams {
  photo: MemoryStoredFile;
  supplierId: string;
}

interface UploadFileParams {
  file: MemoryStoredFile;
  supplierId: string;
}

@Injectable()
export class FileManagerService implements OnModuleInit {
  private supplierFilePath: string;
  private bucketName: string;

  constructor(
    private readonly configService: CustomConfigService,
    private readonly storageService: StorageService,
  ) {}

  onModuleInit() {
    this.supplierFilePath = this.configService.getOrFail(
      'S3_SUPPLIER_FILE_PATH',
    );
    this.bucketName = this.configService.getOrFail('S3_BUCKET');
  }

  async uploadPhoto({ photo, supplierId }: UploadPhotoParams) {
    const { mediumFileBuffer, previewFileBuffer } =
      await this.compressPhoto(photo);

    const keys = this.getPhotoKeys({ photo, supplierId });

    const [originalOutput, mediumOutput, previewOutput] = await Promise.all([
      this.storageService.uploadFile({
        file: photo.buffer,
        mimeType: photo.mimeType,
        key: keys.original,
      }),
      this.storageService.uploadFile({
        file: mediumFileBuffer,
        mimeType: COMPRESS_OPTIONS.medium.mimeType,
        key: keys.medium,
      }),
      this.storageService.uploadFile({
        file: previewFileBuffer,
        mimeType: COMPRESS_OPTIONS.preview.mimeType,
        key: keys.preview,
      }),
    ]);

    const originalUrl = `${this.storageService.baseUrl}/${keys.original}`;
    const mediumUrl = `${this.storageService.baseUrl}/${keys.medium}`;
    const previewUrl = `${this.storageService.baseUrl}/${keys.preview}`;

    return {
      original: {
        url: originalUrl,
        key: keys.original,
        output: originalOutput,
      },
      medium: { url: mediumUrl, key: keys.medium, output: mediumOutput },
      preview: { url: previewUrl, key: keys.preview, output: previewOutput },
    };
  }

  private getPhotoKeys({ photo, supplierId }: UploadPhotoParams) {
    const fileNameUuid = crypto.randomUUID();

    const originalPhotoKey = this.constructPhotoKeyPath({
      supplierId,
      photoType: PhotoType.ORIGINAL,
      extension: photo.extension,
      uuid: fileNameUuid,
    });
    const mediumPhotoKey = this.constructPhotoKeyPath({
      supplierId,
      photoType: PhotoType.MEDIUM,
      extension: COMPRESS_OPTIONS.medium.extension,
      uuid: fileNameUuid,
    });
    const previewPhotoKey = this.constructPhotoKeyPath({
      supplierId,
      photoType: PhotoType.PREVIEW,
      extension: COMPRESS_OPTIONS.preview.extension,
      uuid: fileNameUuid,
    });

    return {
      original: originalPhotoKey,
      medium: mediumPhotoKey,
      preview: previewPhotoKey,
    };
  }

  private async compressPhoto(file: MemoryStoredFile) {
    const [mediumFileBuffer, previewFileBuffer] = await Promise.all([
      sharp(file.buffer)
        .resize({ width: COMPRESS_OPTIONS.medium.width })
        .toFormat(COMPRESS_OPTIONS.medium.extension)
        .webp({ quality: COMPRESS_OPTIONS.medium.quality })
        .toBuffer(),
      sharp(file.buffer)
        .resize({ width: COMPRESS_OPTIONS.preview.width })
        .toFormat(COMPRESS_OPTIONS.preview.extension)
        .webp({ quality: COMPRESS_OPTIONS.preview.quality })
        .toBuffer(),
    ]);

    return { mediumFileBuffer, previewFileBuffer };
  }

  private constructPhotoKeyPath({
    supplierId,
    extension,
    photoType,
    uuid,
  }: PhotoKeyParts) {
    return this.constructFileKeyPath({
      supplierId,
      extension,
      name: `${photoType}-${uuid}`,
    });
  }

  async uploadFile({ file, supplierId }: UploadFileParams) {
    const fileNameUuid = crypto.randomUUID();
    const key = this.constructFileKeyPath({
      name: fileNameUuid,
      extension: file.extension,
      supplierId,
    });
    const url = `${this.storageService.baseUrl}/${key}`;
    const output = await this.storageService.uploadFile({
      file: file.buffer,
      key,
      mimeType: file.mimeType,
    });

    return { url, key, output };
  }

  private constructFileKeyPath({ supplierId, extension, name }: FileKeyParts) {
    return `${this.supplierFilePath}/suppliers/${supplierId}/${name}.${extension}`;
  }

  async deleteFilesByUrl(urls: string[]) {
    const keys = urls.map((url) => {
      return this.extractKeyFromUrl(url);
    });

    return this.storageService.deleteFiles(keys);
  }

  async deleteFileByUrl(url: string) {
    const key = this.extractKeyFromUrl(url);

    return this.storageService.deleteFile(key);
  }

  async deleteFiles(keys: string[]) {
    return this.storageService.deleteFiles(keys);
  }

  async deleteFile(key: string) {
    return this.storageService.deleteFile(key);
  }

  private extractKeyFromUrl(url: string) {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.replace(`/${this.bucketName}`, ''); // remove the first symbol `/` and bucket name
  }

  async scheduleFilesDeletions(keys: string[]) {
    return Promise.all(keys.map((key) => this.scheduleFileDeletion(key)));
  }

  async scheduleFileDeletion(key: string) {
    const tagKey = this.configService.getOrFail('S3_DELETE_OBJECT_TAG_KEY');
    const tagValue = this.configService.getOrFail('S3_DELETE_OBJECT_TAG_VALUE');

    return this.storageService.addFileTag({
      key,
      tags: [{ key: tagKey, value: tagValue }],
    });
  }

  async cancelFileDeletionSchedule(key: string) {
    return this.storageService.deleteFileTag(key);
  }
}
