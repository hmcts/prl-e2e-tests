import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { WelshLanguageRequirementsContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsContent";

export class WelshLanguageRequirementsSubmitPage {
  public static async welshLanguageRequirementsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes,
    welshLanguageRequirementsSelectWelsh,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(
        page,
        welshLanguageRequirementsAllOptionsYes,
        welshLanguageRequirementsSelectWelsh,
      ),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {}

  private static async checkFilledInData(
    page: Page,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {}

  private static async fillInFields(page: Page): Promise<void> {}
}
