import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
// import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RequestToOrderWitnessContent6 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent6";

enum UniqueSelectors {
  urgentReason_Yes = "#awp_isThereReasonForUrgentRequest",
  urgentReason_No = "#awp_isThereReasonForUrgentRequest-2",
  reasonForUrgency = "#awp_urgentRequestReason",
}

export class RequestToOrderWitnessToAttendCourtPage6 {
  public static async requestToOrderWitnessToAttendCourtPage6(
    page: Page,
    accessibilityTest: boolean,
    reasonForUrgency: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, reasonForUrgency);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent6.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${RequestToOrderWitnessContent6.GovukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent6.GovukLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent6.GovukLabel1}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      //   await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    reasonForUrgency: boolean,
  ): Promise<void> {
    if (reasonForUrgency) {
      await page.check(`${UniqueSelectors.urgentReason_Yes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent6.GovukLabel2}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RequestToOrderWitnessContent6.GovukHint}")`,
        1,
      );
      await page.fill(
        UniqueSelectors.reasonForUrgency,
        RequestToOrderWitnessContent6.reasonForUrgencyInput,
      );
    } else {
      await page.check(`${UniqueSelectors.urgentReason_No}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
