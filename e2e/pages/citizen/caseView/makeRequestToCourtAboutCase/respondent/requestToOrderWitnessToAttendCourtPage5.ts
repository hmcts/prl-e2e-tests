import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { RequestToOrderWitnessContent5 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessContent5.ts";

enum UniqueSelectors {
  supportingDocuments_Yes = "#awp_hasSupportingDocuments",
  supportingDocuments_No = "#awp_hasSupportingDocuments-2",
}

export class RequestToOrderWitnessToAttendCourtPage5 {
  public static async requestToOrderWitnessToAttendCourtPage5(
    page: Page,
    accessibilityTest: boolean,
    haveSupportingDocuments: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, haveSupportingDocuments);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent5.GovukCaptionL,
      })
      .waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent5.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${RequestToOrderWitnessContent5.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent5.GovukLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent5.GovukLabel1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    haveSupportingDocumentsUpload: boolean,
  ): Promise<void> {
    if (haveSupportingDocumentsUpload) {
      await page.check(`${UniqueSelectors.supportingDocuments_Yes}`);
    } else {
      await page.check(`${UniqueSelectors.supportingDocuments_No}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
