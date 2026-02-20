import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RequestToOrderWitnessContent3 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessContent3";

enum UniqueSelectors {
  needHwf_Yes = "#awp_need_hwf",
  needHwf_No = "#awp_need_hwf-2",
}

export class RequestToOrderWitnessToAttendCourtPage3 {
  public static async requestToOrderWitnessToAttendCourtPage3(
    page: Page,
    accessibilityTest: boolean,
    needHwf: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, needHwf);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: RequestToOrderWitnessContent3.GovukCaptionL,
      })
      .waitFor();

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestToOrderWitnessContent3.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${RequestToOrderWitnessContent3.GovukBodyM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${RequestToOrderWitnessContent3.GovukLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${RequestToOrderWitnessContent3.GovukBodyM2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${RequestToOrderWitnessContent3.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent3.GovukLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RequestToOrderWitnessContent3.GovukLabel1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    usingHwf: boolean,
  ): Promise<void> {
    if (usingHwf) {
      await page.check(`${UniqueSelectors.needHwf_Yes}`);
    } else {
      await page.check(`${UniqueSelectors.needHwf_No}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
