import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantsFamily/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ApplicantsFamilyContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyContent";

export class ApplicantsFamilySubmitPage {
  public static async applicantsFamilySubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {}

  private static async checkFilledInData(page: Page): Promise<void> {}

  private static async fillInFields(page: Page): Promise<void> {}
}
