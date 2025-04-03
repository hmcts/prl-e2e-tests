import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { Fl401TasksTabContent } from "../../../fixtures/manageCases/caseTabs/FL401/fl401TasksTabContent";

enum IndividualSelectors {
  links = "markdown > div > p > a",
}

export class Fl401TasksTabPage {
  public static async fl401TasksTabPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (!(process.env.MANAGE_CASES_TEST_ENV == "preview")) {
      await this.checkPageLoads(page, accessibilityTest);
    } else {
      return;
    }
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${Fl401TasksTabContent.subTitleW1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        Fl401TasksTabContent,
        "subTitleW",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        14,
        Fl401TasksTabContent,
        "linkW",
        `${IndividualSelectors.links}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Panel}:text-is("${Fl401TasksTabContent.panelW}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
