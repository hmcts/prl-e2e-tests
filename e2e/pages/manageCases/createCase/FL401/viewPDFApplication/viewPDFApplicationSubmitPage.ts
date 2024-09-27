import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";

export class ViewPDFApplicationSubmitPage {
  public static async viewPDFApplicationSubmitPage(
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
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {}

  private static async checkFilledInData(page: Page): Promise<void> {}

  private static async fillInFields(page: Page): Promise<void> {}
}
