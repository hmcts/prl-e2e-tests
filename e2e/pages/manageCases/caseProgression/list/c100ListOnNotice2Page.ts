import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { Helpers } from "../../../../common/helpers.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100ListOnNotice2Content } from "../../../../fixtures/manageCases/caseProgression/List/C100ListOnNotice2Content.js";

export class C100ListOnNotice2Page {
  public static async c100ListOnNotice2Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${C100ListOnNotice2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ListOnNotice2Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${C100ListOnNotice2Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
