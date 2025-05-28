import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { StartContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/startContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

enum uniqueSelectors {
  uniquePSelector = "div.govuk-grid-column-two-thirds > ",
}

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
        `${Selectors.GovukCaptionL}:text-is("${StartContent.caption}")`,
        1,
      ),
      Helpers.checkGroup(page, 4, StartContent, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        3,
        StartContent,
        "embeddedLink",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(page, 6, StartContent, "li", `${Selectors.li}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StartContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:has-text("${StartContent.insetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.uniquePSelector}${Selectors.p}:text-is("${StartContent.nestedP}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${StartContent.startNow}")`,
    );
  }
}
