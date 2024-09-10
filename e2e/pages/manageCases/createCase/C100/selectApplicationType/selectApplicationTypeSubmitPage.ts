import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SelectApplicationTypeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";

export class selectApplicationTypeSubmitPage {
  public static async selectApplicationTypeSubmitPage(
    page: Page,
    accessibilityTest: Boolean
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest),
      // this.checkFilledFields(page, yesNo),
    ]);
    // await this.continue(page);
  }

  private static async checkPageLoads (
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {



    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}