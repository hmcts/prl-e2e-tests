import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ReasonableAdjustmentsLanguageRequirementsContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsContent";
import { Helpers } from "../../../../../common/helpers";

export interface ReasonableAdjustmentsLanguageRequirementsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

export class ReasonableAdjustmentsLanguageRequirementsPage {
  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<ReasonableAdjustmentsLanguageRequirementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.pageTitle})`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.govukInsetText}")`,
        1,
      ),
    ]);
  }
}
