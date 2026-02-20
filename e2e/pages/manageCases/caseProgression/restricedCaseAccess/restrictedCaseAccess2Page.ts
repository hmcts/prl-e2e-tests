import { Page } from "@playwright/test";
// import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { RestrictedCaseAccess2Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess2Content";

interface RestrictedCaseAccess2Options {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  restrictCaseReasonInput = "#markAsRestrictedReason",
}
export class RestrictedCaseAccess2Page {
  public static async restrictedCaseAccess2Page({
    page,
    accessibilityTest,
  }: RestrictedCaseAccess2Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
    await this.submit(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: RestrictedCaseAccess2Options) {
    if (!page) {
      throw new Error("No page found");
    }

    const pageTitle = page.locator(
      `${Selectors.h3}:text-is("${RestrictedCaseAccess2Content.h3}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RestrictedCaseAccess2Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //turn back on once EXUI-3016 is resolved.
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
