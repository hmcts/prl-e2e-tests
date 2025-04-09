import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { RestrictedCaseAccess2Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess2Content.ts";

interface RestrictedCaseAccess2Options {
  judgePage: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  restrictCaseReasonInput = "#markAsRestrictedReason",
}
export class RestrictedCaseAccess2Page {
  public static async restrictedCaseAccess2Page({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccess2Options): Promise<void> {
    await this.checkPageLoads({ judgePage, accessibilityTest });
    await this.fillInFields(judgePage);
    await this.submit(judgePage);
  }

  private static async checkPageLoads({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccess2Options) {
    if (!judgePage) {
      throw new Error("No page found");
    }

    const pageTitle = judgePage.locator(
      `${Selectors.h3}:text-is("${RestrictedCaseAccess2Content.h3}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.GovukFormLabel}:text-is("${RestrictedCaseAccess2Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(judgePage);
    }
  }
  private static async fillInFields(page: Page) {
    await page.fill(
      UniqueSelectors.restrictCaseReasonInput,
      RestrictedCaseAccess2Content.inputText,
    );
  }
  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
