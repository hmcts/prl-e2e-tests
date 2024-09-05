import { expect, Locator, Page } from "@playwright/test";
import { Events, UserRole } from "./types";
import idamLoginHelper from "./idamLoginHelper";

export class Helpers {
  public static async checkCaseNumberRegex(
    page: Page,
  ): Promise<void> {
    const caseNumberRegex = /Casenumber: \d{4,}-\d{4,}-\d{4,}-\d{4,}/;
    const caseNumberSelector = `h2:text-matches("^${caseNumberRegex}$")`;
    await this.checkVisibleAndPresent(
      page,
      caseNumberSelector,
      1
    );
  }

  public static async chooseEventFromDropdown(
    page: Page,
    chosenEvent: Events,
  ): Promise<void> {
    try {
      await page.waitForLoadState("domcontentloaded");
      await page.waitForSelector("#next-step", { state: "visible" });
      await page.selectOption("#next-step", chosenEvent);
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
      await idamLoginHelper.signInUser(page, user, baseURL);
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

  public static async checkGroup<E extends Record<string, string>>(
    page: Page,
    count: number,
    file: E, // Generic type E allows any enum type
    name: string,
    selector: string,
  ): Promise<void[]> {
    return Promise.all([
      ...Array.from({ length: count }, (_, index) => {
        const text = file[`${name}${index + 1}` as keyof E]; // Safely access the enum
        return Helpers.checkVisibleAndPresent(
          page,
          `${selector}:text-is("${text}")`,
          1,
        );
      }),
    ]);
  }

  public static generateCaseName(): string {
    const randomNumber: number = Math.floor(Math.random() * 100) + 1;
    return `Automated tester${randomNumber.toString()}`;
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
}
