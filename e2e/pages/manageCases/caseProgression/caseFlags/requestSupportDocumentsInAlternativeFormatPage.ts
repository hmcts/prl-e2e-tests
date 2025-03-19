import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { RequestSupportDocumentsInAlternativeFormatContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/requestSupportDocumentsInAlternativeFormatContent.ts";

enum UniqueSelectors {
  documentsInSpecifiedColourRadio = "#flag-type-0",
}

export class RequestSupportDocumentsInAlternativeFormatPage {
  public static async requestSupportDocumentsInAlternativeFormatPage(
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
      .locator(Selectors.GovukFieldsetHeading, {
        hasText:
          RequestSupportDocumentsInAlternativeFormatContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RequestSupportDocumentsInAlternativeFormatContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        RequestSupportDocumentsInAlternativeFormatContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
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
    // only decided to fill in one alternative format journey (documents in a specified colour)
    await page.check(UniqueSelectors.documentsInSpecifiedColourRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
