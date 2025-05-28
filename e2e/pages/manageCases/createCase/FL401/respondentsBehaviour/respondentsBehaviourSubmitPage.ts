import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/submitContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { RespondentsBehaviourContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourContent";

export class RespondentsBehaviourSubmitPage {
  public static async respondentsBehaviourSubmitPage(
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
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
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
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
      1,
    );
  }

  private static async checkFilledInData(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        17,
        SubmitContent,
        "formLabel",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${RespondentsBehaviourContent.exampleText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
