import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { Helpers } from "../../../../common/helpers.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100ListOnNotice3Content } from "../../../../fixtures/manageCases/caseProgression/List/C100ListOnNotice3Content.js";

export class C100ListOnNotice3Page {
  public static async c100ListOnNotice3Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${C100ListOnNotice3Content.pageTitle}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${C100ListOnNotice3Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${C100ListOnNotice3Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ListOnNotice3Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
