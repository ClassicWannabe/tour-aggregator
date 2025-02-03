import { DateTime } from 'luxon';
import { TourRepeatPattern, Weekday } from './types';
import { Injectable } from '@nestjs/common';

interface Occurrence {
  startDate: DateTime;
  endDate: DateTime;
}

@Injectable()
export class RecurringTourService {
  generateRecurringDates(
    initialStart: DateTime,
    initialEnd: DateTime,
    recurrenceEnd: DateTime,
    weekdays: Weekday[],
    pattern: TourRepeatPattern,
  ): Occurrence[] {
    const occurrences: Occurrence[] = [];

    // Add the initial occurrence
    occurrences.push({ startDate: initialStart, endDate: initialEnd });

    const duration = initialEnd.diff(initialStart);

    switch (pattern) {
      case TourRepeatPattern.WEEKLY:
      case TourRepeatPattern.BIWEEKLY:
      case TourRepeatPattern.THREE_WEEKLY: {
        const intervalWeeks = {
          [TourRepeatPattern.WEEKLY]: 1,
          [TourRepeatPattern.BIWEEKLY]: 2,
          [TourRepeatPattern.THREE_WEEKLY]: 3,
        }[pattern];

        for (const weekday of weekdays) {
          const targetWeekday = this.weekdayToNumber(weekday);

          let currentStart = initialStart;
          if (currentStart.weekday !== targetWeekday) {
            // Calculate days to add to reach the target weekday
            const daysToAdd = (targetWeekday + 7 - currentStart.weekday) % 7;
            currentStart = currentStart.plus({ days: daysToAdd });
          } else {
            // Start from the next interval to avoid duplicating the initial occurrence
            currentStart = currentStart.plus({ weeks: intervalWeeks });
          }

          // Generate occurrences for this weekday
          while (currentStart <= recurrenceEnd) {
            const currentEnd = currentStart.plus(duration);
            occurrences.push({ startDate: currentStart, endDate: currentEnd });
            currentStart = currentStart.plus({ weeks: intervalWeeks });
          }
        }
        break;
      }
      case TourRepeatPattern.MONTHLY: {
        let currentStart = initialStart;

        while (true) {
          // Move to the next month
          currentStart = currentStart.plus({ months: 1 });

          // Adjust to the same day of the month, clamping to the end if necessary
          const adjustedDate = currentStart.set({ day: initialStart.day });
          if (adjustedDate > recurrenceEnd) {
            break;
          }

          currentStart = adjustedDate;

          // Check if the current weekday is in the allowed list
          const currentWeekday = this.numberToWeekday(currentStart.weekday);
          if (weekdays.includes(currentWeekday)) {
            const currentEnd = currentStart.plus(duration);
            occurrences.push({ startDate: currentStart, endDate: currentEnd });
          }

          // Prevent infinite loop by checking if next month is still within the recurrence end
          const nextMonth = currentStart
            .plus({ months: 1 })
            .set({ day: initialStart.day });
          if (nextMonth > recurrenceEnd) {
            break;
          }
        }
        break;
      }
      default:
        throw new Error(`Unsupported recurrence pattern: ${pattern}`);
    }

    // Sort all occurrences by start date
    occurrences.sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());

    return occurrences;
  }

  private weekdayToNumber(weekday: Weekday): number {
    switch (weekday) {
      case Weekday.MONDAY:
        return 1;
      case Weekday.TUESDAY:
        return 2;
      case Weekday.WEDNESDAY:
        return 3;
      case Weekday.THURSDAY:
        return 4;
      case Weekday.FRIDAY:
        return 5;
      case Weekday.SATURDAY:
        return 6;
      case Weekday.SUNDAY:
        return 7;
      default:
        throw new Error(`Invalid weekday: ${weekday}`);
    }
  }

  private numberToWeekday(weekdayNumber: number): Weekday {
    switch (weekdayNumber) {
      case 1:
        return Weekday.MONDAY;
      case 2:
        return Weekday.TUESDAY;
      case 3:
        return Weekday.WEDNESDAY;
      case 4:
        return Weekday.THURSDAY;
      case 5:
        return Weekday.FRIDAY;
      case 6:
        return Weekday.SATURDAY;
      case 7:
        return Weekday.SUNDAY;
      default:
        throw new Error(`Invalid weekday number: ${weekdayNumber}`);
    }
  }
}
