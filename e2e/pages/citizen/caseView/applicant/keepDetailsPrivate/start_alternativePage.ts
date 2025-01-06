import { Selectors } from "../../../../../common/selectors.ts";
import { Details_knownContent } from "../../../../../fixtures/citizen/caseView/applicant/keepDetailsPrivate/details_knownContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";

interface Start_alternativeContent {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

enum UniqueSelectors {
  yes = "#startAlternative",
  hiddenYesAddress = "#contactDetailsPrivate",
  hiddenYesPhone = "#contactDetailsPrivate-2",
  hiddenYesEmail = "#contactDetailsPrivate-3",
  no = "#startAlternative-2",
}

export class Start_alternativePage {
  public static async start_alternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: Start_alternativeContent): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: Details_knownContent.pageTitle,
      })
      .waitFor();
    await Promise.all([]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    startAlternativeYesNo,
  }: Partial<Start_alternativeContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    if (startAlternativeYesNo) {
      await page.click(UniqueSelectors.yes);
      await page.click(UniqueSelectors.hiddenYesAddress);
      await page.click(UniqueSelectors.hiddenYesPhone);
      await page.click(UniqueSelectors.hiddenYesEmail);
    } else {
      await page.check(UniqueSelectors.no);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
