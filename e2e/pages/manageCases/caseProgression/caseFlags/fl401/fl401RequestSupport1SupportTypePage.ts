import { Page } from "@playwright/test";
import { SupportType } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401RequestSupport1SupportTypeContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SupportTypeContent.ts";

enum UniqueSelectors {
  reasonableAdjustmentsRadio = "#flag-type-0",
  languageInterpreterRadio = "#flag-type-1",
}

export class Fl401RequestSupport1SupportTypePage {
  public static async fl401RequestSupport1SupportTypePage(
    page: Page,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, supportType);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFieldsetHeading, {
        hasText: Fl401RequestSupport1SupportTypeContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1SupportTypeContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        Fl401RequestSupport1SupportTypeContent,
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

  private static async fillInFields(
    page: Page,
    supportType: SupportType,
  ): Promise<void> {
    if (supportType === "reasonableAdjustment") {
      await page.check(UniqueSelectors.reasonableAdjustmentsRadio);
    } else {
      await page.check(UniqueSelectors.languageInterpreterRadio);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
