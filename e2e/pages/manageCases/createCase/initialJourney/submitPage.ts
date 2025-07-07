import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { SubmitContent } from "../../../../fixtures/manageCases/createCase/initialJourney/submitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class SubmitPage {
  public static async submitPage(
    page: Page,
    accessibilityTest: boolean,
    caseName: string,
    isDummyCase: boolean = false,
  ): Promise<void> {
    await this.checkContent(page, accessibilityTest, caseName);
    await this.submit(page, isDummyCase);
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
      await new AxeUtils(page).audit();
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

  private static async submit(page: Page, isDummyCase: boolean): Promise<void> {
    if (isDummyCase) {
      await page.click(
        `${Selectors.button}:text-is("${SubmitContent.createMyDummyCase}")`,
      );
    } else {
      await page.click(
        `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
      );
    }
  }
}
