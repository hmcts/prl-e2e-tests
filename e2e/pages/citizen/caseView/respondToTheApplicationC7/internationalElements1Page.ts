import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { InternationalElementsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/internationalElementsContent.ts";

enum UniqueSelectors {
  question = "#start-2",
}

export class InternationalElements1Page {
  public static async internationalElements1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: InternationalElementsContent.h1,
      })
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHint}:text-is("${InternationalElementsContent.hint}")`,
      1,
    );
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); // failing accessibility check, ticket raised for a fix FPVTL-3226
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
