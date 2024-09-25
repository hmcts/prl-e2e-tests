import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WelshLanguageRequirementsContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export class WelshLanguageRequirementsPage {
  public static async welshLanguageRequirementsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(
      page,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
      accessibilityTest,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {}

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {}
}
