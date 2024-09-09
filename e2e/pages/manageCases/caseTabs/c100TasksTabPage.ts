import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { C100TasksTabContent } from "../../../fixtures/manageCases/caseTabs/c100TasksTabContent";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";

enum IndividualSelectors {
  links = "markdown > div > p > a",
  greyedLinks = "markdown > div > p",
}

export class C100TasksTabPage {
  public static async c100TasksTabPage(
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
      `${Selectors.h2}:text-is("${C100TasksTabContent.subTitle1}")`,
    );
    await Promise.all([
      await Helpers.checkGroup(
        page,
        8,
        C100TasksTabContent,
        "subTitle",
        `${Selectors.h2}`,
      ),
      await Helpers.checkGroup(
        page,
        16,
        C100TasksTabContent,
        "link",
        `${IndividualSelectors.links}`,
      ),
      await Helpers.checkGroup(
        page,
        4,
        C100TasksTabContent,
        "greyedLink",
        `${IndividualSelectors.greyedLinks}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
