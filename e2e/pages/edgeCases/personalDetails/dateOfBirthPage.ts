import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { DateOfBirthContent } from "../../../fixtures/edgeCases/personalDetails/dateOfBirthContent.ts";

interface DateOfBirthOptions {
  page: Page;
  accessibilityTest: boolean;
  under18: boolean;
  dob?: { day: string; month: string; year: string }; // Optional
}

enum UniqueSelectors {
  day = "#applicantDateOfBirth-day",
  month = "#applicantDateOfBirth-month",
  year = "#applicantDateOfBirth-year",
}

export class DateOfBirthPage {
  public static async dateOfBirth({
    page,
    accessibilityTest,
    under18,
    dob,
  }: DateOfBirthOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (under18 && dob) {
      await this.fillInDOB(page, dob);
    }
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${DateOfBirthContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        DateOfBirthContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        DateOfBirthContent,
        "hint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async fillInDOB(
    page: Page,
    dob: { day: string; month: string; year: string },
  ): Promise<void> {
    await page.fill(UniqueSelectors.day, dob.day);
    await page.fill(UniqueSelectors.month, dob.month);
    await page.fill(UniqueSelectors.year, dob.year);
  }
}
