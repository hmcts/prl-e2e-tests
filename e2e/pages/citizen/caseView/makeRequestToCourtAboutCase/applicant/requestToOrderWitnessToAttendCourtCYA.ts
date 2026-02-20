import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RequestToOrderWitnessContentCYA } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContentCYA";

export class RequestToOrderWitnessToAttendCourtCYA {
  public static async requestToOrderWitnessToAttendCourtCYA(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.submitApplication(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: RequestToOrderWitnessContentCYA.GovukHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        RequestToOrderWitnessContentCYA,
        `GovukSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        RequestToOrderWitnessContentCYA,
        `GovukSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${RequestToOrderWitnessContentCYA.GovukLink}")`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async submitApplication(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submitApplication}")`,
    );
  }
}
