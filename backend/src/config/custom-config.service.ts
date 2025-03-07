import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomConfigService extends ConfigService {
  getOrFail<T = string>(propertyPath: string) {
    const value = this.get<T>(propertyPath);

    if (!value) {
      throw new Error(
        `The config value seems to be falsy. Path: ${propertyPath}`,
      );
    }

    return value;
  }

  getOrFailNumber(propertyPath: string) {
    const value = +this.getOrFail<string>(propertyPath);

    if (isNaN(value)) {
      throw new Error(
        `The config value couldn't be converted to number. Raw value: ${value}. Path: ${propertyPath}`,
      );
    }

    return value;
  }

  getOrFailBool(propertyPath: string) {
    const value = this.getOrFail<string>(propertyPath);
    const lowercaseValue = value.toLowerCase();

    if (lowercaseValue !== 'true' && lowercaseValue !== 'false') {
      throw new Error(
        `The config value couldn't be converted boolean. Raw value: ${value}. Lower cased value: ${lowercaseValue}. Allowed values: "true" and "false". Path: ${propertyPath}`,
      );
    }

    return lowercaseValue === 'true';
  }
}
