import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { StartContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/startContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface StartPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class StartPage {
  public static async startPage({
    page,
    accessibilityTest,
  }: StartPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${StartContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${StartContent.caption}}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        StartContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        StartContent,
        "embeddedLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        StartContent,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StartContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${StartContent.insetText}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${StartContent.startNow}")`,
    );
  }
}
