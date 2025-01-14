import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { C100SummaryTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100SummaryTabContent";

export class C100SummaryTabPage {
  public static async c100SummaryTabPage(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await this.clickTab(page);
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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async clickTab(page: Page): Promise<void> {
    await page
      .getByRole("tab", { name: C100SummaryTabContent.tabName, exact: true })
      .click();
  }
}
