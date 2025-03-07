import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DateTime } from 'luxon';

type ConstraintDate = (() => DateTime) | DateTime | Date | null;

type ConstraintDates = {
  min?: ConstraintDate;
  max?: ConstraintDate;
};

@ValidatorConstraint({ async: false })
export class IsDateBetweenConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (!value) return false;

    const rawDates = args.constraints[0] as ConstraintDates;
    const dates = this.initDates(rawDates);

    const inputDate = DateTime.fromISO(value);

    if (!inputDate.isValid) return false;

    let isValid = true;
    if (dates.min) {
      isValid = inputDate >= dates.min;
    }
    if (dates.max) {
      isValid = isValid && inputDate <= dates.max;
    }

    return isValid;
  }

  private initDates(dates: ConstraintDates) {
    const initialisedDates: { min: DateTime | null; max: DateTime | null } = {
      min: null,
      max: null,
    };
    if (dates.min) {
      initialisedDates.min = this.initDate(dates.min);
    }
    if (dates.max) {
      initialisedDates.max = this.initDate(dates.max);
    }

    return initialisedDates;
  }

  private initDate(date: ConstraintDate) {
    let initialisedDate: DateTime | null = null;
    if (typeof date === 'function') {
      initialisedDate = date();
    }
    if (date instanceof Date) {
      initialisedDate = DateTime.fromJSDate(date);
    }
    if (DateTime.isDateTime(date)) {
      initialisedDate = date;
    }

    return initialisedDate;
  }

  defaultMessage(args: ValidationArguments): string {
    const rawDates = args.constraints[0] as ConstraintDates;
    const dates = this.initDates(rawDates);
    const minDateMessage = dates.min ? `Min: ${dates.min.toISODate()}.` : '';
    const maxDateMessage = dates.max ? `Max: ${dates.max.toISODate()}.` : '';

    return `Date must be between constraints. ${minDateMessage} ${maxDateMessage}`;
  }
}

export function IsDateBetween(
  dates: ConstraintDates,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [dates],
      validator: IsDateBetweenConstraint,
    });
  };
}
