import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401RequestSupport1TellUsMoreAboutTheRequestContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1TellUsMoreAboutTheRequestContent.ts";

enum UniqueSelectors {
  flagCommentsTextbox = "#flagComments",
}

export class Fl401RequestSupport1TellUsMoreAboutTheRequestPage {
  public static async fl401RequestSupport1TellUsMoreAboutTheRequestPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukLabel, {
        hasText:
          Fl401RequestSupport1TellUsMoreAboutTheRequestContent.govUkLabel,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1TellUsMoreAboutTheRequestContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        Fl401RequestSupport1TellUsMoreAboutTheRequestContent,
        `govUkHint`,
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.flagCommentsTextbox,
      Fl401RequestSupport1TellUsMoreAboutTheRequestContent.comments,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
