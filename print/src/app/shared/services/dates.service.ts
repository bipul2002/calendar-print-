import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class DateService {
  reportsMaxDaysRange;
  constructor() {
    this.reportsMaxDaysRange =
     30;
  }

  getDateAfterXNumberOfDays(numberOfDays: any) {
    const currentDate = moment();
    return moment(currentDate).add(numberOfDays, 'days').toDate();
  }

  /**
   * Determines whether a given period (from startDate to endDate) satisfies the specified criteria.
   * @param startDate
   * @param endDate
   * @param editable - Specifies whether to check if date should be future inclusive or not
   * @returns Returns true if the current date falls within the provided period (inclusive of start and end dates)
   * and meets the specified criteria, false otherwise. This also considers for future date if editable flag is true, otherwise not.
   */
  isPeriodCurrentAndEditable(startDate: any, endDate = null, editable = false) {
    const currentDate = moment().startOf('day');
    const startMoment = moment(startDate).startOf('day');
    const endMoment = endDate ? moment(endDate).startOf('day') : null;

    return (
      (startMoment.isSameOrBefore(currentDate) &&
        (endMoment === null || currentDate.isSameOrBefore(endMoment))) ||
      (editable && startMoment.isAfter(currentDate))
    );
  }

  getDateDisplayFormatFromConfig() {
    return 'DD.MM.YYYY';

  }
  getDateFormatForCalenderFromConfig() {
   return 'DD.MM.YYYY';
  }
  formatDateForDisplay(date: any) {
    const dateFormat = this.getDateDisplayFormatFromConfig();
    if (date) {
      return moment(date).format(dateFormat);
    }
    return null;
  }

  formatDateAsPerSystemConfig(date: any) {
    if (date != null) {
      return moment(date).format(this.getDateDisplayFormatFromConfig());
    }
    return null;
  }

  formatDisqualificationPeriod(ds: any) {
    const endDate = ds.endDate
      ? this.formatDateAsPerSystemConfig(ds.endDate)
      : 'N/A';

    return this.formatDateAsPerSystemConfig(ds.startDate) + ' to ' + endDate;
  }

  /**
   * Formats a date value to 'YYYY-MM-DD' string format suitable for API payloads.
   * If the input is not a valid date, returns null.
   *
   * @param date - The date value to format.
   * @returns - The formatted date string or null if input is invalid.
   */
  formatDateForApi(date: any) {
    return date ? moment(date).startOf('day').utc() : null;
  }

  formatDateToSendOnlyDate(date: any) {
    return date ? moment(date).format('DD.MM.YYYY') : null;
  }

  /**
   * Validate if the date range is within reportsMaxDaysRange
   * @param startDate
   * @param endDate
   * @returns
   */
  validateReportMaxDateRange(startDate: any, endDate: any) {
    const fromDate = moment(startDate);
    const toDate = moment(endDate);
    if (fromDate.isValid() && toDate.isValid()) {
      const dayDiff = toDate.diff(fromDate, 'days');

      if (dayDiff > this.reportsMaxDaysRange) {
        return false;
      }
      return true;
    }
    return false;
  }
}
