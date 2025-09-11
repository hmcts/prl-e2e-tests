export class DateHelperUtils {
  constructor() {}

  public generateDOB(under18: boolean = true): [string, string, string] {
    const today = new Date();
    const year = under18
      ? (today.getFullYear() - 17).toString() // under 18 years old
      : (today.getFullYear() - 22).toString(); // over 21 years old

    const month = String(today.getMonth() + 1).padStart(2, "0"); // 01–12
    const day = String(today.getDate()).padStart(2, "0"); // 01–31

    return [day, month, year];
  }
}
