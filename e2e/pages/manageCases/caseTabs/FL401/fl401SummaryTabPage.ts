import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { FL401SummaryTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401SummaryTabContent";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";

export class FL401SummaryTabPage {
  public static async fl401SummaryTabPage(
    page: Page,
    isCourtListed: boolean,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      isCourtListed,
      accessibilityTest,
      applicantLivesInRefuge,
    );
  }

  private static async checkPageLoads(
    page: Page,
    isCourtListed: boolean,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${FL401SummaryTabContent.tabTitle}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${FL401SummaryTabContent.courtNameLabel}")`,
      1,
    );
    if (isCourtListed) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${FL401SummaryTabContent.aberystwythCourt}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${FL401SummaryTabContent.testCourt}")`,
        1,
      );
    }
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
      await AccessibilityTestHelper.run(page);
    }
  }
}
