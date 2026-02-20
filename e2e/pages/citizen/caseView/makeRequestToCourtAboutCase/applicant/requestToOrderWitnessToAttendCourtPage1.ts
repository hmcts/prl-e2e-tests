import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RequestToOrderWitnessContent1 } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";

export class RequestToOrderWitnessToAttendCourtPage1 {
  public static async requestToOrderWitnessToAttendCourtPage1(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.startNow(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: RequestToOrderWitnessContent1.GovukHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        RequestToOrderWitnessContent1,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${RequestToOrderWitnessContent1.GovukLink1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async startNow(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.startNow}")`,
    );
  }
}
