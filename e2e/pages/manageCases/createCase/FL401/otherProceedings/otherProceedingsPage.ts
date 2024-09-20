import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherProceedingsContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/otherProceedingsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { otherProceedingsRadios } from "../../../../../journeys/manageCases/createCase/FL401";

export class OtherProceedingsPage {
  public static async otherProceedingsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, otherProceedingsRadios, accessibilityTest);
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
    otherProceedingsRadios: otherProceedingsRadios,
    accessibilityTest: boolean,
  ): Promise<void> {}

  private static async checkFormLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
