import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Helpers } from "../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { RespondentDashboardContent } from "../../../fixtures/citizen/activateCase/respondentDashboardContent.ts";
import { applicationSubmittedBy } from "../../../common/types.ts";

export class RespondentDashboardPage {
  public static async respondentDashboardPage(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      caseRef,
      accessibilityTest,
      applicationSubmittedBy,
    );
  }

  private static async checkPageLoads(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    const heading =
      applicationSubmittedBy == "Solicitor"
        ? RespondentDashboardContent.respondentGovukHeadingXL
        : RespondentDashboardContent.govukHeadingXL;
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: heading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("Case number ${caseRef}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        RespondentDashboardContent,
        "h2",
        Selectors.h2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
