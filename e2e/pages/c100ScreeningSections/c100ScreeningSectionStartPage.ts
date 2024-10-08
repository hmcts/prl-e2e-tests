import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import {
  C100ScreeningSectionStartContent
} from "../../fixtures/c100ScreeningSections/c100ScreeningSectionStartContent";
import { Helpers } from "../../common/helpers";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";

interface C100ScreeningSectionStartPageOptions {
  page: Page;
  accessibilityTest: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean
}

export class C100ScreeningSectionStartPage{
  public static async c100ScreeningSectionStartPage({
    page,
    accessibilityTest
  }: C100ScreeningSectionStartPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest
    });
    await this.fillInFields(page)
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${C100ScreeningSectionStartContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${C100ScreeningSectionStartContent.caption}}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        4,
        C100ScreeningSectionStartContent,
        'p',
        `${Selectors.p}`
      ),
      Helpers.checkGroup(
        page,
        3,
        C100ScreeningSectionStartContent,
        'embeddedLink',
        `${Selectors.GovukLink}`
      ),
      Helpers.checkGroup(
        page,
        6,
        C100ScreeningSectionStartContent,
        'li',
        `${Selectors.li}`
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${C100ScreeningSectionStartContent.h2}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${C100ScreeningSectionStartContent.insetText}")`,
        1
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${C100ScreeningSectionStartContent.startNow}")`
    );
  }
}