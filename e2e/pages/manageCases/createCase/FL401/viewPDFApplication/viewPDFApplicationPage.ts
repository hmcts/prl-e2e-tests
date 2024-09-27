import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export class ViewPDFApplicationPage {
  public static async viewPDFApplicationPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}
}
