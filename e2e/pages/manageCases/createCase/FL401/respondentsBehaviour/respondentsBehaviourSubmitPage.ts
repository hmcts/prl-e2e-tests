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
      this.checkPageLoads(page, respondentsBehaviourAllOptionsYes),
      this.checkFilledInData(page, respondentsBehaviourAllOptionsYes),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(
    page: Page,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.checkInfoLabel}")`,
        1,
      ),
    ]);
    if (respondentsBehaviourAllOptionsYes) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
        1,
      );
    }
  }

  private static async checkFilledInData(
    page: Page,
    respondentsBehaviourAllOptionsYes: boolean,
  ): Promise<void> {
    if (respondentsBehaviourAllOptionsYes) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          17,
          SubmitContent,
          "formLabel",
          `${Selectors.GovukFormLabel}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${RespondentsBehaviourContent.exampleText}")`,
          1,
        ),
      ]);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
