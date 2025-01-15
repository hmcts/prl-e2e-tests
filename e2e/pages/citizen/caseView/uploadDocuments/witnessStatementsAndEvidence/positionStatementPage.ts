import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { CourtPermissionContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/courtPermissionContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { yesNoNA } from "../../../../../common/types.ts";

enum UniqueSelectors {
  courtHasAskedForDoc = "#hasCourtAskedForThisDoc",
  courtHasNotAskedForDoc = "#hasCourtAskedForThisDoc-2",
}

export class PositionStatementPage {
  public static async courtPermissionPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoNA: yesNoNA,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, yesNoNA);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: CourtPermissionContent.GovukHeadingXLPositionStatement,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${CourtPermissionContent.GovukCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${CourtPermissionContent.GovukFieldsetLegend}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    yesNoNA: yesNoNA,
  ): Promise<void> {
    if (yesNoNA === "Yes") {
      await page.click(UniqueSelectors.courtHasAskedForDoc);
    } else if (yesNoNA === "No") {
      await page.click(UniqueSelectors.courtHasNotAskedForDoc);
    } else {
      throw new Error("Invalid value for yesNoNA");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
