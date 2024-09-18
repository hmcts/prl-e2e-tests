import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { RespondentsBehaviourContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourContent";

export class RespondentsBehaviourSubmitPage {
  public static async respondentsBehaviourSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      respondentsBehaviourAllOptionsYes,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page, respondentsBehaviourAllOptionsYes),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {}

  private static async checkFilledInData(
    page: Page,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {}

  private static async fillInFields(page: Page): Promise<void> {}
}
