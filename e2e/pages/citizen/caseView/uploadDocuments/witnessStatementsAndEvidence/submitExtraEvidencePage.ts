import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { SubmitExtraEvidenceContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidenceContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class SubmitExtraEvidencePage {
  public static async submitExtraEvidencePage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: SubmitExtraEvidenceContent.GovukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${SubmitExtraEvidenceContent.GovukCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${SubmitExtraEvidenceContent.GovukBody1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${SubmitExtraEvidenceContent.GovukBody2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
