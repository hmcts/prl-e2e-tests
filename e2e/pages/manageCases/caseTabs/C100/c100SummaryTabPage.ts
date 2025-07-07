import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100SummaryTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100SummaryTabContent.ts";

export class C100SummaryTabPage {
  public static async c100SummaryTabPage(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${C100SummaryTabContent.tabTitle}")`,
    );
    if (applicantLivesInRefuge || otherPersonLivesInRefuge) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${C100SummaryTabContent.refugeSubTitle}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100SummaryTabContent.refugeQuestionText16}")`,
        2,
      );
    } else {
      await page.waitForSelector(
        `${Selectors.h2}:text-is("${C100SummaryTabContent.refugeSubTitle}")`,
        { state: "hidden" },
      );
    }
    await Promise.all([
      await Helpers.checkGroup(
        page,
        9,
        C100SummaryTabContent,
        "subTitle",
        `${Selectors.h2}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
