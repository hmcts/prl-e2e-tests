import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { HearingStageContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingStageContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  allocation = "#ABA5-ALL",
}

export class HearingStagePage {
  public static async hearingStagePage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${HearingStageContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        26,
        HearingStageContent,
        "GovukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(`${UniqueSelectors.allocation}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
