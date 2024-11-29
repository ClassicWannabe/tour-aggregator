import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomConfigService extends ConfigService {
  getOrFail<T>(propertyPath: string) {
    const value = this.get<T>(propertyPath);

    if (!value) {
      throw new Error(
        `The config value seems to be falsy. Path: ${propertyPath}`,
      );
    }

    return value;
  }
}
