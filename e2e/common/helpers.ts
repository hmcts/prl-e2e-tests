import { expect, Locator, Page } from "@playwright/test";
import {
  c100SolicitorEvents,
  fl401SolicitorEvents,
  fl401SubmittedSolicitorEvents,
  UserRole,
} from "./types";
import idamLoginHelper from "./idamLoginHelper";
import { Selectors } from "./selectors.ts";

export class Helpers {
  public static async chooseEventFromDropdown(
    page: Page,
    chosenEvent:
      | c100SolicitorEvents
      | fl401SolicitorEvents
      | fl401SubmittedSolicitorEvents,
  ): Promise<void> {
    try {
      await page.waitForLoadState("domcontentloaded");
      await page.waitForSelector("#next-step", { state: "visible" });
      await page.selectOption("#next-step", chosenEvent);
      await page.waitForTimeout(5000);
      const goButton: Locator = page.getByRole("button", { name: "Go" });
      await expect(goButton).toBeEnabled();
      await goButton.click();
    } catch (error) {
      console.error(
        "An error occurred while choosing the event from the dropdown:",
        error,
      );
      throw error;
    }
  }

  public static async selectSolicitorEvent(
    page: Page,
    event: c100SolicitorEvents | fl401SolicitorEvents,
  ): Promise<void> {
    await page.waitForSelector(`.mat-tab-label-content:text-is("Tasks")`);
    await page.click(
      `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("${event}")`,
    );
  }

  public static async checkVisibleAndPresent(
    page: Page,
    selector: string,
    count: number,
  ): Promise<void> {
    try {
      const visibilityPromises: Promise<void>[] = Array.from(
        { length: count },
        (_, i: number) =>
          expect.soft(page.locator(selector).nth(i)).toBeVisible(),
      );
      const countPromise: Promise<void> = expect
        .soft(page.locator(selector))
        .toHaveCount(count);
      await Promise.all([...visibilityPromises, countPromise]);
    } catch (error) {
      console.error(
        `An error occurred while checking visibility and count of '${selector}':`,
        error,
      );
      throw error;
    }
  }

  public static async goToCase(
    page: Page,
    baseURL: string,
    caseNumber: string,
  ): Promise<void> {
    try {
      await page.goto(Helpers.generateUrl(baseURL, caseNumber));
    } catch (error) {
      console.error("An error occurred while navigating to the case: ", error);
      throw error;
    }
  }

  public static async signOutAndGoToCase(
    page: Page,
    user: UserRole,
    baseURL: string,
    caseNumber: string,
  ): Promise<void> {
    try {
      await page.locator(`a:text-is(" Sign out ")`).click();
      await page.waitForLoadState("domcontentloaded");
      await idamLoginHelper.signInSolicitorUser(page, user, baseURL);
      await Helpers.goToCase(page, baseURL, caseNumber);
    } catch (error) {
      console.error(
        "An error occurred while signing out and navigating to the case:",
        error,
      );
      throw error;
    }
  }

  public static todayDate(): string {
    const now: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    };
    const dateString: string = now.toLocaleDateString("en-US", options);
    const [month, day, year] = dateString.split("/");
    return `${day} ${Helpers.shortMonth(parseInt(month, 10))} ${year}`;
  }

  public static getCurrentDateFormatted(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  }

  public static dayAbbreviatedMonthYear(
    day: string,
    month: string,
    year: string,
  ): string {
    const monthIndex: number = parseInt(month, 10);
    if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error("Invalid month value");
    }
    return `${day} ${Helpers.shortMonth(monthIndex)} ${year}`;
  }

  public static dayLongMonthYear(
    day: string,
    month: string,
    year: string,
  ): string {
    const monthIndex: number = parseInt(month, 10);
    if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error("Invalid month value");
    }
    return `${day} ${Helpers.longMonth(monthIndex)} ${year}`;
  }

  public static async checkGroup<E extends Record<string, string>>(
    page: Page,
    count: number,
    file: E, // Generic type E allows any enum type
    name: string,
    selector: string,
  ): Promise<void[]> {
    return Promise.all([
      ...Array.from({ length: count }, (_, index) => {
        const text: E[keyof E] = file[`${name}${index + 1}` as keyof E]; // Safely access the enum
        return Helpers.checkVisibleAndPresent(
          page,
          `${selector}:text-is("${text}")`,
          1,
        );
      }),
    ]);
  }

  public static async checkGroupHasText<E extends Record<string, string>>(
    page: Page,
    count: number,
    file: E, // Generic type E allows any enum type
    name: string,
    selector: string,
  ): Promise<void[]> {
    return Promise.all([
      ...Array.from({ length: count }, (_, index) => {
        const text: E[keyof E] = file[`${name}${index + 1}` as keyof E]; // Safely access the enum
        return Helpers.checkVisibleAndPresent(
          page,
          `${selector}:has-text("${text}")`,
          1,
        );
      }),
    ]);
  }

  public static generateCaseName(): string {
    const randomNumber: number = Math.floor(Math.random() * 100) + 1;
    return `Automated tester${randomNumber.toString()}`;
  }

  public static capitalizeFirstPart(string: string): string {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private static readonly months: string[] = [
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

  private static generateUrl(baseURL: string, caseNumber: string): string {
    const caseNumberDigits: string = caseNumber.replace(/\D/g, "");
    return `${baseURL}/case-details/${caseNumberDigits}#History`;
  }

  private static shortMonth(index: number): string {
    if (index < 1 || index > 12) {
      throw new Error("Month index out of range");
    }
    return Helpers.months[index - 1].substring(0, 3);
  }

  private static longMonth(index: number): string {
    if (index < 1 || index > 12) {
      throw new Error("Month index out of range");
    }
    return Helpers.months[index - 1];
  }

  private static async checkCaseNumberRegex(page: Page): Promise<void> {
    const caseNumberRegex: RegExp = /^Casenumber: \d{4}-\d{4}-\d{4}-\d{4}$/;
    try {
      const visibilityPromises: Promise<void>[] = Array.from(
        { length: 1 },
        (_, i: number) =>
          expect
            .soft(
              page
                .locator(`${Selectors.h2}`, { hasText: caseNumberRegex })
                .nth(i),
            )
            .toBeVisible(),
      );
      const countPromise: Promise<void> = expect
        .soft(page.locator(`${Selectors.h2}`, { hasText: caseNumberRegex }))
        .toHaveCount(1);
      await Promise.all([...visibilityPromises, countPromise]);
    } catch (error) {
      console.error(
        `An error occurred while checking visibility and accuracy of the case number heading:`,
        error,
      );
      throw error;
    }
  }

  public static generateDOB(under18: boolean = true): [string, string, string] {
    const today = new Date();
    const year = under18
      ? (today.getFullYear() - 17).toString() // Less than 18 years
      : (today.getFullYear() - 22).toString(); // More than 21 years
    const month = (today.getMonth() + 1).toString(); // getMonth() is 0-based
    const day = today.getDate().toString();
    return [day, month, year];
  }
}
