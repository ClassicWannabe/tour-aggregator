import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function SanitizeString() {
  return Transform((params) => {
    let value = params.value;
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid search query');
    }

    // Replace potentially dangerous SQL characters
    value = value
      .replace(/'/g, "''") // Escape single quotes
      .replace(/;/g, '') // Remove semicolons
      .trim(); // Trim whitespace

    return value;
  });
}
