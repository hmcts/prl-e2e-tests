import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { SupportingDocumentsContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/supportingDocumentsContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  supportingDocumentsYes = "#awp_hasSupportingDocuments",
  supportingDocumentsNo = "#awp_hasSupportingDocuments-2",
}

export class SupportingDocumentsPage {
  public static async supportingDocumentsPage(
    page: Page,
    accessibilityTest: boolean,
    supportingDocuments: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, supportingDocuments);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: SupportingDocumentsContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SupportingDocumentsContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${SupportingDocumentsContent.GovukFieldsetLegend}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    supportingDocuments: boolean,
  ): Promise<void>{
    if(supportingDocuments) {
      await page.check(`${UniqueSelectors.supportingDocumentsYes}`);
    }
    else {
      await page.check(`${UniqueSelectors.supportingDocumentsNo}`);
    }
    await page.click(`${Selectors.GovukButton}:has-text("${SupportingDocumentsContent.continue}")`,);
  }
}
