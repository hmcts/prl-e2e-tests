import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { PreviousProceedingsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/previousProceedingsContent.ts";

enum UniqueSelectors {
  question1 = "#proceedingsStart-2",
  question2 = "#proceedingsStartOrder-2",
}

export class PreviousProceedings1Page {
  public static async previousProceedings1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH1, {
        hasText: PreviousProceedingsContent.h1,
      })
      .waitFor();
    await Promise.all([
      await Helpers.checkGroup(
        page,
        2,
        PreviousProceedingsContent,
        "fieldSetLegend",
        Selectors.GovukFieldsetLegend,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukRadios}:text-is("${PreviousProceedingsContent.radioYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukRadios}:text-is("${PreviousProceedingsContent.radioNo}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question1);
    await page.click(UniqueSelectors.question2);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
