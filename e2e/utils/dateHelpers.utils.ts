export class DateHelperUtils {
  private readonly months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor() {
  }

  todayDate(
    longFormat: boolean = false,
    array: boolean = false,
  ): string | string[] {
    const now: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    };
    const dateString: string = now.toLocaleDateString("en-US", options);
    const [month, day, year] = dateString.split("/");

    if (array) {
      return [day, month, year];
    } else if (longFormat) {
      return this.dayLongMonthYear(day, month, year);
    } else {
      return this.dayAbbreviatedMonthYear(day, month, year);
    }
  }

  // gets today's date in long format e.g. 	17 September 2025
  dayLongMonthYear(
    day: string,
    month: string,
    year: string,
  ): string {
    const monthIndex: number = parseInt(month, 10);
    if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error("Invalid month value");
    }
    return `${day} ${this.longMonth(monthIndex)} ${year}`;
  }

  dayAbbreviatedMonthYear(
    day: string,
    month: string,
    year: string,
  ): string {
    const monthIndex: number = parseInt(month, 10);
    if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error("Invalid month value");
    }
    return `${day} ${this.shortMonth(monthIndex)} ${year}`;
  }

  private shortMonth(index: number): string {
    if (index < 1 || index > 12) {
      throw new Error("Month index out of range");
    }
    return this.months[index - 1].substring(0, 3);
  }

  private longMonth(index: number): string {
    if (index < 1 || index > 12) {
      throw new Error("Month index out of range");
    }
    return this.months[index - 1];
  }
}