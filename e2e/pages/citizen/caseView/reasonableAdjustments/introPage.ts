import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { IntroContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/introContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class IntroPage {
  public static async introPage(
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
        hasText: IntroContent.govUkHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${IntroContent.govUkCaptionL}")`,
        1,
      ),
      Helpers.checkGroup(page, 5, IntroContent, `p`, `${Selectors.p}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${IntroContent.span1}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, IntroContent, `li`, `${Selectors.li}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${IntroContent.govUkHeadingM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        IntroContent,
        `govUkLink`,
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${IntroContent.govUkWarningText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        IntroContent,
        `govUkHeadingS`,
        `${Selectors.GovukHeadingS}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.startNow}")`,
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
