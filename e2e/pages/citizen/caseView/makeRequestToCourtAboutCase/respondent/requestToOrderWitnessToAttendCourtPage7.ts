import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { RequestToOrderWitnessContent7 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessContent7";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum UniqueSelectors {
  urgentReason_Yes = "#awp_isThereReasonForUrgentRequest",
  urgentReason_No = "#awp_isThereReasonForUrgentRequest-2",
  reasonForUrgency = "#awp_urgentRequestReason",
}

export class RequestToOrderWitnessToAttendCourtPage7 {
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
        hasText: RequestToOrderWitnessContent7.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${RequestToOrderWitnessContent7.GovukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent7.GovukLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent7.GovukLabel1}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent7.GovukLabel2}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RequestToOrderWitnessContent7.GovukHint}")`,
        1,
      );
      await page.fill(
        UniqueSelectors.reasonForUrgency,
        RequestToOrderWitnessContent7.reasonForUrgencyInput,
      );
    } else {
      await page.check(`${UniqueSelectors.urgentReason_No}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
