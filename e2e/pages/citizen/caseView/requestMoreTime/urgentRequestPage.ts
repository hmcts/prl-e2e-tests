import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { UrgentRequestContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/urgentRequestContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  reasonUrgentRequestYes = "#awp_isThereReasonForUrgentRequest",
  reasonUrgentRequestNo = "#awp_isThereReasonForUrgentRequest-2",
  addRefNumber = "#awp_urgentRequestReason",
}

export class UrgentRequestPage {
  public static async urgentRequestPage(
    page: Page,
    accessibilityTest: boolean,
    reasonUrgentRequest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, reasonUrgentRequest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: UrgentRequestContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${UrgentRequestContent.GovukHeadingM}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async fillInFields(
    page: Page,
    reasonUrgentRequest: boolean,
  ): Promise<void> {
    if (reasonUrgentRequest) {
      await page.check(`${UniqueSelectors.reasonUrgentRequestYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${UrgentRequestContent.GovukLabel}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${UrgentRequestContent.GovukHint}")`,
        1,
      );
      await page.fill(
        `${UniqueSelectors.addRefNumber}`,
        UrgentRequestContent.reasonUrgentRequest,
      );
    } else {
      await page.check(`${UniqueSelectors.reasonUrgentRequestNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
