import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { HearingJudgeContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingJudgeContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

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
      // Helpers.checkVisibleAndPresent(
      //   page,
      //   `${Selectors.GovukFieldsetHeading}:text-is("${HearingJudgeContent.GovukFieldsetHeading}")`,
      //   1,
      // ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
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
