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

interface UploadPhotoParams {
  photo: MemoryStoredFile;
  supplierId: string;
}

@Injectable()
export class FileManagerService implements OnModuleInit {
  private tourFilePath: string;
  private supplierFilePath: string;

  constructor(
    private readonly configService: CustomConfigService,
    private readonly storageService: StorageService,
  ) {}

  onModuleInit() {
    this.tourFilePath =
      this.configService.getOrFail<string>('S3_TOUR_FILE_PATH');
    this.supplierFilePath = this.configService.getOrFail<string>(
      'S3_SUPPLIER_FILE_PATH',
    );
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
      original: { url: originalUrl, output: originalOutput },
      medium: { url: mediumUrl, output: mediumOutput },
      preview: { url: previewUrl, output: previewOutput },
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
    return `${this.tourFilePath}/suppliers/${supplierId}/${photoType}-${uuid}.${extension}`;
  }

  async deletePhotos(urls: string[]) {
    const bucketName = this.configService.getOrFail<string>('S3_BUCKET');
    const keys = urls.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname.replace(`/${bucketName}`, ''); // remove the first symbol `/` and bucket name
    });

    return this.storageService.deleteFiles(keys);
  }
}
