import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { SharingYourDocumentsContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { yesNoNA } from "../../../../../common/types.ts";

enum UniqueSelectors {
  docNotShared = "#haveReasonForDocNotToBeShared",
  docShared = "#haveReasonForDocNotToBeShared-2",
}

export class SharingYourDocumentsPage {
  public static async sharingYourDocumentsPage(
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
        hasText: SharingYourDocumentsContent.GovukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${SharingYourDocumentsContent.GovukCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${SharingYourDocumentsContent.GovukWarningText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${SharingYourDocumentsContent.GovukFieldsetLegend}")`,
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
      await page.click(UniqueSelectors.docShared);
    } else if (yesNoNA === "No") {
      await page.click(UniqueSelectors.docNotShared);
    } else {
      throw new Error("Invalid value for yesNoNA");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
