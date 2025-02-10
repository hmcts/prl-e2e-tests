import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { C100TasksTabContent } from "../../../fixtures/manageCases/caseTabs/C100/c100TasksTabContent";
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
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
