import { Page } from "@playwright/test";
import accessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { SubmitContent } from "../../../../fixtures/manageCases/createCase/initialJourney/submitContent";
import { Helpers } from "../../../../common/helpers";

export class SubmitPage {
  public static async submitPage(
    page: Page,
    accessibilityTest: boolean,
    caseName: string,
  ): Promise<void> {
    await this.checkContent(page, accessibilityTest, caseName);
    await this.fillInFields(page);
  }

  private static async checkContent(
    page: Page,
    accessibilityTest: boolean,
    caseName: string,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page, caseName),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page) {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        SubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
    ]);
  }

  private static async checkFilledInData(
    page: Page,
    caseName: string,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${caseName}")`,
      1,
    );
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
