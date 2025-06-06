import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { FL401SummaryTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401SummaryTabContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { RestrictedCaseAccess2Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess2Content.ts";

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
      await new AxeUtils(page).audit();
    }
  }
  public static async fl401SummaryTabRestrictCaseCheckPage(
    page: Page,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${FL401SummaryTabContent.h2_restrictedCase}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${FL401SummaryTabContent.text16_restrictedCaseReason}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${RestrictedCaseAccess2Content.inputText}")`,
        1,
      ),
    ]);
  }
}
