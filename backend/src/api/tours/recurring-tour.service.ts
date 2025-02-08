import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';

interface Occurrence {
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class RecurringTourService {
  generateRecurringDates(
    initialStart: Date,
    initialEnd: Date,
    recurrenceDates: Date[],
  ): Occurrence[] {
    const occurrences: Occurrence[] = [];

    // Add the initial occurrence
    occurrences.push({ startDate: initialStart, endDate: initialEnd });
    const initialStartDate = DateTime.fromJSDate(initialStart);
    const initialEndDate = DateTime.fromJSDate(initialEnd);

    const recurrences = recurrenceDates.map((date) => {
      const recurrenceStartDate = DateTime.fromJSDate(date).set({
        hour: initialStartDate.hour,
        minute: initialStartDate.minute,
        second: initialStartDate.second,
      });

      const recurrenceEndDate = recurrenceStartDate.plus({
        milliseconds: initialEndDate.diff(initialStartDate).milliseconds,
      });

      return {
        startDate: recurrenceStartDate.toJSDate(),
        endDate: recurrenceEndDate.toJSDate(),
      };
    });

    occurrences.push(...recurrences);

    occurrences.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return occurrences;
  }
}
