import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { RequestToOrderWitnessContent2 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent2";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum UniqueSelectors {
  alreadyCompletedFP25_Yes = "#awp_completedForm",
  alreadyCompletedFP25_No = "#awp_completedForm-2",
}

export class RequestToOrderWitnessToAttendCourtPage2 {
  public static async requestToOrderWitnessToAttendCourtPage2(
    page: Page,
    accessibilityTest: boolean,
    usingHWF: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, usingHWF);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent2.GovukCaptionL,
      })
      .waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent2.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${RequestToOrderWitnessContent2.GovukBodyM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${RequestToOrderWitnessContent2.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent2.GovukLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent2.GovukLabel2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    alreadyCompletedFP25: boolean,
  ): Promise<void> {
    if (alreadyCompletedFP25) {
      await page.check(`${UniqueSelectors.alreadyCompletedFP25_Yes}`);
    } else {
      await page.check(`${UniqueSelectors.alreadyCompletedFP25_No}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
