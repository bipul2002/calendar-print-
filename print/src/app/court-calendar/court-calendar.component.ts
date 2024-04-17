import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'; // Import moment for date manipulation
import { lastValueFrom } from 'rxjs';
import { DateService } from '../shared/services/dates.service';


@Component({
  selector: 'app-court-calendar',
  templateUrl: './court-calendar.component.html',
  styleUrls: ['./court-calendar.component.scss'],
})
export class CourtCalendarComponent implements OnInit {
  yearsList: any = [];
  months: any = [];
  selectedYear: any;
  courtCalendarForm: any;
  selectedWeek: any;
  weekArray: any;
  courtList: any = [];
  selectWeek: any;
  selectedDatesArr: any = [];
  selectedDatesIds: any = [];
  calendarIdWithDateStrMap: any = {};
  showDiv = true;
  weekdaysAbbreviated: any = [];
  isPrint = false;
  submitted = false;
  configureSlotDialog = false;
  clearSlots = false;
  selectedCourtObject: any;
  highlightClass = 'selected-date';
  selectedWeekArr: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllWeeks();
    this.getCourtList();
    this.getYears();
  }
  initForm() {
    this.courtCalendarForm = this.formBuilder.group({
      court: ['', [Validators.required]],
      selectedWeek: ['', []],
      monday: ['', []],
      tuesday: ['', []],
      wednesday: ['', []],
      thursday: ['', []],
      friday: ['', []],
      selectedYear: ['', [Validators.required]],
    });
  }
  getCourtList() {
   
        this.courtList = [{"label":"Calendar Court","value":8},{"label":"Kingston Parish Court","value":1},{"label":"Test Court","value":4},{"label":"asdsad","value":3},{"label":"sdsd","value":7}]
  }
 
  getYears() {
    // Get the current year
    const currentYear = moment();

    // Get the next year
    const nextYear = moment().add(1, 'year');
    this.yearsList.push(
      {
        label: currentYear.year(),
        value: currentYear,
      },
      {
        label: nextYear.year(),
        value: nextYear,
      }
    );
    // If Local add previous year as well
      const previousYear = moment().subtract(1, 'year');

      this.yearsList.push({
        label: previousYear.year(),
        value: previousYear,
      });

    this.courtCalendarForm.patchValue({
      selectedYear: this.yearsList[0].value,
    });
    // this.selectedYear = this.yearsList[0].value;

    this.getMonthList(currentYear);
  }
  getMonthList(currentYear: any) {
    this.months = [];
    const currentMonth = currentYear.startOf('year');
    for (let i = 0; i < 12; i++) {
      this.months.push({
        id: i,
        dateObj: currentMonth.clone().add(i, 'months'),
      });
    }
  }
  getDaysInMonth(month: moment.Moment) {
    const daysInMonthCount = month.daysInMonth();
    const daysInMonth = [...new Array(month.clone().date(1).day())];
    for (let i = 1; i <= daysInMonthCount; i++) {
      daysInMonth.push({
        id: this.generateDynamicIds(
          month.format('MM'),
          this.convertToTwoDigits(i)
        ),
        dateObj: month.clone().date(i),
      });
    }

    return daysInMonth;
  }
  convertToTwoDigits(number: any) {
    return number < 10 ? '0' + number : number.toString();
  }
  isSelectedWeek(day: moment.Moment): boolean {
    const dayOfWeek = day?.day(); // Assuming day can be undefined
    if (this.selectedWeekArr.includes(parseInt(dayOfWeek?.toString()))) {
      return true;
    }
    return false;
    // if (this.selectedWeek) {
    //   return day?.day() === parseInt(this.selectedWeek); // Monday has day index 1
    // }
    // return false;
  }
  // getAllDatesOfWeek() {
  //   this.weekArray = [];
  //   const year = 2023; // Change this to the desired year
  //   const mondayDates = this.getMondaysOfYear(year);

  //   this.weekArray.push({});
  // }
  // getMondaysOfYear(year: number): Date[] {
  //   const startDate = startOfYear(new Date(year, 0, 1));
  //   const endDate = endOfYear(new Date(year, 11, 31));

  //   const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
  //   const mondayDates = weeks.filter((weekStart) => isMonday(weekStart));
  //   return mondayDates;
  // }
  isWeekend(day: moment.Moment): boolean {
    return day?.day() === 0 || day?.day() === 6;
  }
  dateSelected(id: any, day: any) {
    const element = document.getElementById(id);
    const dateFormat = moment(day).toDate();
    const dateJSON = {
      id: id,
      dateObj: dateFormat,
    };
    // Add logic to disable weekend
    if (element?.classList.contains(this.highlightClass)) {
      element?.classList.remove(this.highlightClass);
      const index = this.selectedDatesArr.findIndex(
        (date: any) => date.id == dateJSON.id
      );

      this.selectedDatesArr.splice(index, 1);
    } else {
      if (!this.isWeekend(day.dateObj)) {
        element?.classList.add(this.highlightClass);
        this.selectedDatesArr.push(dateJSON);
      }
    }
  }
  dayByObj(index: any, user: any) {
    return user ? user.id : undefined;
  }
  generateCalendarAsPerFilter() {
    this.getCourtCalendarIfExists();
  }
  selectSpecificWeeks(control: any, weekDay: any) {
    const weekControl = this.courtCalendarForm.controls[control].value;
    if (weekControl == true) {
      // Add it

      this.selectedWeekArr.push(weekDay);
    } else {
      // Remove it
      const indexToRemove = this.selectedWeekArr.indexOf(weekDay);

      if (indexToRemove !== -1) {
        this.selectedWeekArr.splice(indexToRemove, 1);
      }
    }
    // this.getAllDatesOfWeek();
  }
 
  convertDatesIntoObj(originalDates: string[]) {
    if (originalDates) {
      return originalDates.map((date) => ({
        // dateId: date,
        date: moment(date, 'YYYY-MM-DD').startOf('day').utc(),
        courtCalendarId: this.calendarIdWithDateStrMap[date],
      }));
    }
    return null;
  }
  generateDynamicIds(month: any, date: any) {
    const yearFull = this.getFormControl('selectedYear');
    if (yearFull) {
      const year = yearFull.format('YYYY');
      return `${year}-${month}-${date}`;
    }
    return null;
  }
  getFormControl(key: string) {
    if (this.courtCalendarForm?.get(key)?.value) {
      return this.courtCalendarForm?.get(key)?.value;
    }
    return null;
  }
  processDateObjects(dateObjects: any[]) {
    this.calendarIdWithDateStrMap = new Object();
    dateObjects.forEach((dtObj: any) => {
      this.calendarIdWithDateStrMap[dtObj.dateString] = dtObj.courtCalendarId;
      this.findDivWithIdAndApplySelectedClass(dtObj.dateString);
    });
  }
  async getCourtCalendarIfExists() {
    this.clearAll();
    const courtId = this.getFormControl('court');
    const selectedYear = this.getFormControl('selectedYear');
    const year = selectedYear.format('YYYY');

    this.selectedCourtObject = this.courtList.find(
      (court: any) => court.value === courtId
    );

    if (!courtId || !year) {
   

      return;
    }

   
  }
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  findDivWithIdAndApplySelectedClass(id: any) {
    const element = document.getElementById(id);
    element?.classList.add(this.highlightClass);
  }
  // reloadDiv() {
  //   this.showDiv = false;
  //   setTimeout(() => {
  //     this.showDiv = true;
  //   }, 500);
  // }
  async clearAll() {
    this.selectedWeekArr = [];
    this.courtCalendarForm.patchValue({
      selectedWeek: null,
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
    });
    this.selectedWeek = null;
    this.clearAllSelectedDates();
  }
  clearAllSelectedDates() {
    const allDivs = document.querySelectorAll('div');
    const highlightClass = this.highlightClass;

    Array.from(allDivs).forEach((div) => {
      if (div.classList.contains(highlightClass)) {
        div.classList.remove(highlightClass);
      }
    });
  }
  getAllWeeks() {
    this.weekdaysAbbreviated = [];
    for (let i = 0; i < 7; i++) {
      this.weekdaysAbbreviated.push(moment().day(i).format('dd'));
    }
  }
  getCourtName() {
    const courtId = this.getFormControl('court');
    if (courtId && this.courtList) {
      return this.courtList.find((crt: any) => crt.value == courtId)?.label;
    }
    return null;
  }
  getYear() {
    const year = this.getFormControl('selectedYear');
    if (year) {
      return year.format('YYYY');
    }
  }

  // print() {
  //   this.isPrint = true;
  //   const printContent = document.getElementById('print-calender');
  //   if (printContent) {
  //     const printWindow = window.open('', '_blank');
  //     if (printWindow) {
  //       printWindow.document.write(
  //         '<html><head><title>Print</title></head><body>'
  //       );
  //       printWindow.document.write(
  //         '<style> <link id="theme-css" rel="stylesheet" type="text/css" href="src/print.scss"/></style>'
  //       );
  //       printWindow.document.write(printContent.innerHTML);
  //       printWindow.document.write('</body></html>');
  //       printWindow.document.close();

  //       printWindow.onload = () => {
  //         printWindow.print();
  //         printWindow.close();
  //       };
  //     } else {
  //       console.error("Element with ID 'print-calender' not found.");
  //     }
  //   }
  // }
  handleConfigureSlot() {
    this.clearSlots = false;
    const selectedCourtValue = this.getFormControl('court');
    this.selectedCourtObject = this.courtList.find(
      (court: any) => court.value === selectedCourtValue
    );
    if (this.selectedCourtObject) {
      this.configureSlotDialog = true;
    } else {
    }
  }
  configureSlotDialogHide() {
    this.clearSlots = true;
  }
}
