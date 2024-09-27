import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { Fl401TasksTabContent } from "../../../fixtures/manageCases/caseTabs/fl401TasksTabContent";

enum IndividualSelectors {
  links = "markdown > div > p > a",
}

export class Fl401TasksTabPage {
  public static async fl401TasksTabPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${Fl401TasksTabContent.subTitle1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        Fl401TasksTabContent,
        "subTitle",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        14,
        Fl401TasksTabContent,
        "link",
        `${IndividualSelectors.links}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Panel}:text-is("${Fl401TasksTabContent.panel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
