import {
  Browser,
  BrowserContext,
  expect,
  Locator,
  Page,
} from "@playwright/test";
import { IdamLoginHelper } from "../utils/idamLoginHelper.utils.ts";
import { Selectors } from "./selectors.ts";
import {
  amendEvents,
  c100SolicitorEvents,
  courtAdminEvents,
  fl401CaseWorkerActions,
  fl401JudiciaryEvents,
  fl401SolicitorEvents,
  fl401SubmittedSolicitorEvents,
  UserRole,
  WACaseWorkerActions,
} from "./types.ts";
import Config from "../utils/config.utils.ts";

export class Helpers {
  public static async chooseEventFromDropdown(
    page: Page,
    chosenEvent:
      | c100SolicitorEvents
      | fl401SolicitorEvents
      | fl401SubmittedSolicitorEvents
      | fl401JudiciaryEvents
      | WACaseWorkerActions
      | fl401CaseWorkerActions
      | courtAdminEvents
      | amendEvents
      | "Applicant’s family", // this is a temporary fix - the dropdown event needs to be renamed to match "Applicant's family"
  ): Promise<void> {
    await page.waitForLoadState("domcontentloaded");
    await page.waitForSelector("#next-step", { state: "visible" });
    await page.selectOption("#next-step", chosenEvent);
    await page.waitForTimeout(1500);
    const goButton: Locator = page.getByRole("button", { name: "Go" });
    await expect(goButton).toBeEnabled();
    await expect
      .poll(
        async () => {
          const goButtonStillVisible = await goButton.isVisible();
          if (goButtonStillVisible) await goButton.click();
          return goButtonStillVisible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [15_000],
          // Allow up to 5 minutes for the go button to disappear
          timeout: 300_000,
        },
      )
      .toBeFalsy();
  }

  public static async selectSolicitorEvent(
    page: Page,
    event: c100SolicitorEvents | fl401SolicitorEvents,
  ): Promise<void> {
    const eventSelector = `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:has-text("${event}")`;
    await page.waitForSelector(`.mat-tab-label-content:text-is("Tasks")`);
    await page.locator(eventSelector).waitFor();
    //retry until element is clicked or task heading is no longer visible
    await expect
      .poll(
        async () => {
          const taskTitleStillVisible = await page
            .locator('.mat-tab-label-content:text-is("Tasks")')
            .isVisible();
          if (taskTitleStillVisible) await page.click(eventSelector);
          return taskTitleStillVisible;
        },
        {
          intervals: [1_000, 2_000, 10_000],
          timeout: 100_000,
        },
      )
      .toBeFalsy();
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
    caseTab: string,
  ): Promise<void> {
    try {
      await page.goto(Helpers.generateUrl(baseURL, caseNumber, caseTab));
    } catch (error) {
      console.error("An error occurred while navigating to the case: ", error);
      throw error;
    }
  }

  public static async signOutAndGoToCase(
    page: Page,
    baseURL: string,
    caseNumber: string,
    caseTab: string,
    user: UserRole,
  ): Promise<void> {
    try {
      await page.locator(`a:text-is(" Sign out ")`).click();
      await page.waitForLoadState("domcontentloaded");
      const idamLoginHelper = await new IdamLoginHelper();
      await idamLoginHelper.signInLongLivedUser(page, user, baseURL);
      await Helpers.goToCase(page, baseURL, caseNumber, caseTab);
    } catch (error) {
      console.error(
        "An error occurred while signing out and navigating to the case:",
        error,
      );
      throw error;
    }
  }

  public static todayDate(
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
      return Helpers.dayLongMonthYear(day, month, year);
    } else {
      return Helpers.dayAbbreviatedMonthYear(day, month, year);
    }
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
        if (text == undefined) {
          throw new Error(
            `Check Group will fail on ${name} as the text is undefined. You likely passed a number that was the greater than the count of items in the available group. Task failed on ${page.url()}`,
          );
        }
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

  private static generateUrl(
    baseURL: string,
    caseNumber: string,
    caseTab: string,
  ): string {
    const caseNumberDigits: string = caseNumber.toString().replace(/\D/g, "");
    if (
      caseTab.toLowerCase() === "tasks" ||
      caseTab.toLowerCase() === "roles and access"
    ) {
      return `${baseURL}/case-details/${caseNumberDigits}/${caseTab}`;
    } else if (caseTab.toLowerCase() === "Draft orders") {
      return `${baseURL}/case-details/${caseNumberDigits}#Draft%20orders`;
    } else {
      return `${baseURL}/case-details/${caseNumberDigits}#${caseTab}`;
    }
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

  public static async checkCaseNumberRegex(page: Page): Promise<void> {
    const caseNumberRegex: RegExp = /^\d{16}$/;
    try {
      const visibilityPromises: Promise<void>[] = Array.from(
        { length: 1 },
        (_, i: number) =>
          expect
            .soft(
              page
                .locator(`${Selectors.strong}`, { hasText: caseNumberRegex })
                .nth(i),
            )
            .toBeVisible(),
      );
      const countPromise: Promise<void> = expect
        .soft(page.locator(`${Selectors.strong}`, { hasText: caseNumberRegex }))
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

  public static async assignTaskToMe(page: Page, taskName: string) {
    await this.waitForTask(page, taskName);
    const taskLocator = page.locator("exui-case-task", {
      hasText: taskName,
    });
    await taskLocator.locator(Selectors.a, { hasText: "Assign to me" }).click();
    await page
      .locator(Selectors.alertMessage, {
        hasText: "You've assigned yourself a task. It's available in My tasks.",
      })
      .waitFor();
  }

  public static async assignTaskToMeAndTriggerNextSteps(
    page: Page,
    taskName: string,
    nextStepsActionName: string,
  ) {
    await this.waitForTask(page, taskName);
    const taskLocator = page.locator("exui-case-task", {
      hasText: taskName,
    });
    await taskLocator.locator(Selectors.a, { hasText: "Assign to me" }).click();
    await page
      .locator(Selectors.alertMessage, {
        hasText: "You've assigned yourself a task. It's available in My tasks.",
      })
      .waitFor();
    await taskLocator
      .locator(Selectors.a, { hasText: nextStepsActionName })
      .click();
  }

  public static async waitForTask(page: Page, taskName: string) {
    // refresh page until the task shows up - there can be some delay
    await expect
      .poll(
        async () => {
          const visible = await page
            .locator(Selectors.strong, {
              hasText: taskName,
            })
            .isVisible();
          if (!visible) {
            await page.reload();
          }
          return visible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [10_000],
          // Allow up to a minute for it to become visible
          timeout: 100_000,
        },
      )
      .toBeTruthy();
  }

  public static async checkTaskAppearsForUser(
    browser: Browser,
    userRole: UserRole,
    ccdRef: string,
    taskName: string,
  ): Promise<void> {
    const page: Page = await this.openNewBrowserWindow(browser, userRole);
    await this.goToCase(page, Config.manageCasesBaseURLCase, ccdRef, "tasks");
    await this.waitForTask(page, taskName);
  }

  public static async openNewBrowserWindow(
    browser: Browser,
    user: UserRole,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + `${user}.json`,
    });
    return await newContext.newPage();
  }

  public static async getCaseNumberFromUrl(page: Page): Promise<string> {
    const url: string = page.url();
    const caseNumberMatch: RegExpMatchArray | null = url.match(
      /case-details\/PRIVATELAW\/PRLAPPS\/(\d{16}).*?/,
    );
    if (caseNumberMatch === null) {
      throw new Error("Unable to extract case number from URL");
    }
    return caseNumberMatch[1];
  }

  public static async waitForTaskToDisappear(page: Page, taskName: string) {
    // Refresh page until the task disappears - there can be some delay

    await page
      .locator(Selectors.h2, {
        hasText: "Active tasks",
      })
      .waitFor();

    await expect
      .poll(
        async () => {
          const visible = await page
            .locator(Selectors.strong, {
              hasText: taskName,
            })
            .isVisible();
          if (visible) {
            await page.reload();
          }
          return !visible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [10_000],
          // Allow up to a minute for it to disappear
          timeout: 100_000,
        },
      )
      .toBeTruthy();
  }

  public static getFormattedCardExpiryDate(
    month: number,
    year: number,
  ): string {
    return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
  }

  public static async IsEqualityAndDiversityPageDisplayed(page: Page) {
    await expect
      .poll(
        async () => {
          const url = page.url();
          return !url.includes(Config.citizenFrontendBaseURL);
        },
        {
          intervals: [1_000],
          timeout: 100_000,
        },
      )
      .toBeTruthy();

    return page.url().includes("pcq");
  }

  public static async handleEventBasedOnEnvironment(
    page: Page,
    event: c100SolicitorEvents | fl401SolicitorEvents,
  ): Promise<void> {
    if (
      process.env.MANAGE_CASES_TEST_ENV === "aat" ||
      process.env.MANAGE_CASES_TEST_ENV === "demo"
    ) {
      await Helpers.selectSolicitorEvent(page, event);
    } else if (process.env.MANAGE_CASES_TEST_ENV === "preview") {
      if (event === "Applicant's family") {
        // this is a temporary fix - the dropdown event is spelt with a different apostrophe
        await Helpers.chooseEventFromDropdown(page, "Applicant’s family");
      } else {
        await Helpers.chooseEventFromDropdown(page, event);
      }
    } else {
      throw new Error(
        `Unexpected environment in URL: ${process.env.MANAGE_CASES_TEST_ENV}`,
      );
    }
  }

  public static async clickTab(page: Page, tabName: string) {
    await page
      .getByRole("tab", {
        name: tabName,
        exact: true,
      })
      .click();
  }

  public static async clickCheckbox(page: Page, label: string) {
    await page
      .getByRole("checkbox", {
        name: label,
        exact: true,
      })
      .check();
  }

  public static async clickButton(page: Page, label: string) {
    await page
      .getByRole("button", {
        name: label,
        exact: true,
      })
      .click();
  }

  public static getHyphenatedCaseReference(caseNumber?: string): string {
    if (!caseNumber?.trim()) {
      throw new Error(
        "Invalid case number: Expected a non-empty 16-digit string.",
      );
    }
    return caseNumber.match(/.{1,4}/g)!.join("-");
  }

  public static async openPdfLink(page: Page, linkLocator: Locator) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      linkLocator.click(),
    ]);
    await pdfPage.waitForLoadState("domcontentloaded");
    return pdfPage;
  }

  public static async getCaseEndState(page: Page) {
    await this.clickTab(page, "History");
    return await page
      .locator("//tr[th/span[contains(text(), 'End state')]]/td")
      .textContent();
  }

  public static async getCaseStatusFromSummaryTab(page: Page) {
    return await page
      .locator("//tr[th/span[contains(text(), 'Case status')]]/td")
      .innerText();
  }

  public static async getCourtNameFromSummaryTab(page: Page) {
    return await page
      .locator("//tr[th/span[contains(text(), 'Court name')]]/td")
      .innerText();
  }
}
