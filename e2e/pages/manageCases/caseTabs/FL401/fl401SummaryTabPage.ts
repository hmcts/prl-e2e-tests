import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { FL401SummaryTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401SummaryTabContent";

export class FL401SummaryTabPage {
  public static async fl401SummaryTabPage(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await this.clickTab(page);
    await this.checkPageLoads(page, accessibilityTest, applicantLivesInRefuge);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${FL401SummaryTabContent.tabTitle}")`,
    );
    if (applicantLivesInRefuge) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${FL401SummaryTabContent.refugeSubTitle}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${FL401SummaryTabContent.refugeQuestionText16}")`,
        2,
      );
    } else {
      await page.waitForSelector(
        `${Selectors.h2}:text-is("${FL401SummaryTabContent.refugeSubTitle}")`,
        { state: "hidden" },
      );
    }
    await Promise.all([
      await Helpers.checkGroup(
        page,
        8,
        FL401SummaryTabContent,
        "subTitle",
        `${Selectors.h2}`,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); - ADD TICKET
    }
  }

  private static async clickTab(page: Page): Promise<void> {
    await page
      .getByRole("tab", { name: FL401SummaryTabContent.tabName, exact: true })
      .click();
  }
}
