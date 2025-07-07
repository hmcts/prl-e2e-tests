import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingJudgeContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingJudgeContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  specificJudgeYes = "#specificJudgeName",
  specificJudgeNo = "#noSpecificJudge",
}

export class HearingJudgePage {
  public static async hearingJudgePage(
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
        hasText: `${HearingJudgeContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
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
    await page.check(`${UniqueSelectors.specificJudgeNo}`);
    await page.check('input[type="checkbox"][value="19"]');
    await page.check('input[type="checkbox"][value="30"]');
    await page.check('input[type="checkbox"][value="24"]');
    await page.check('input[type="checkbox"][value="33"]');
    await page.check('input[type="checkbox"][value="45"]');
    await page.check('input[type="checkbox"][value="46"]');
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
