import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";
import { CourtPermissionContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/courtPermissionContent";
import { Helpers } from "../../../../../common/helpers";
import { yesNoNA } from "../../../../../common/types";

enum UniqueSelectors {
  courtHasAskedForDoc = "#hasCourtAskedForThisDoc",
  courtHasNotAskedForDoc = "#hasCourtAskedForThisDoc-2",
}

export class WitnessStatementPage {
  public static async witnessStatementPage(
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
        hasText: CourtPermissionContent.GovukHeadingXLWitnessStatement,
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
      await new AxeUtils(page).audit();
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
