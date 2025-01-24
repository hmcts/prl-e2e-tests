import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { StartApplicationContent } from "../../../../../fixtures/citizen/caseView/makeARequestToTheCourt/makeEX740Application/startApplicationContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class StartApplicationPage {
  public static async startApplicationPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.startNow(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: StartApplicationContent.govUkHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${StartApplicationContent.govUkCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StartApplicationContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, StartApplicationContent, `p`, `${Selectors.p}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${StartApplicationContent.govUkLink}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async startNow(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.startNow}")`,
    );
  }
}
