import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { C100TasksTabContent } from "../../../fixtures/manageCases/caseTabs/C100/c100TasksTabContent.ts";
import { Helpers } from "../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

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
      `${Selectors.h2}:text-is("${C100TasksTabContent.subTitleW1}")`,
    );
    await Promise.all([
      await Helpers.checkGroup(
        page,
        8,
        C100TasksTabContent,
        "subTitleW",
        `${Selectors.h2}`,
      ),
      await Helpers.checkGroup(
        page,
        15,
        C100TasksTabContent,
        "linkW",
        `${IndividualSelectors.links}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
