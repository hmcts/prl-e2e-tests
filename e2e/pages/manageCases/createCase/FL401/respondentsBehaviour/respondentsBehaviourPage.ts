import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentsBehaviourContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../../common/types";

export class RespondentsBehaviourPage {
  public static async respondentsBehaviourPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(
      page,
      respondentsBehaviourAllOptionsYes,
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
    respondentsBehaviourAllOptionsYes: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {}
}
