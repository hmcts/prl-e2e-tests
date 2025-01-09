import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import {
  ConfirmationContent
} from "../../../../../fixtures/citizen/caseView/applicant/contactPreferences/confirmationContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class ConfirmationPage {
  public static async confirmationPage(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ConfirmationContent.GovukHeadingL
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${ConfirmationContent.GovukBodyM}")`,
        1
      )
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`
    );
  }
}
