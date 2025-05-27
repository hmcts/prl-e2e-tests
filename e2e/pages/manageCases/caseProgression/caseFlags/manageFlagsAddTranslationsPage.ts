import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { ManageFlagsAddTranslationsContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/manageFlagsAddTranslationsContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum UniqueSelectors {
  otherDescriptionTextbox = "#otherDescription",
  otherDescriptionWelshTextbox = "#otherDescription_cy",
  flagCommentsWelshTextbox = "#flagComment_cy",
}

export class ManageFlagsAddTranslationsPage {
  public static async manageFlagsAddTranslationsPage(
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
      .locator(Selectors.GovukLabelM, {
        hasText: ManageFlagsAddTranslationsContent.govUkLabelM,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageFlagsAddTranslationsContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ManageFlagsAddTranslationsContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ManageFlagsAddTranslationsContent.govUkHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ManageFlagsAddTranslationsContent.govUkHint2}")`,
        4,
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
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.otherDescriptionTextbox,
      ManageFlagsAddTranslationsContent.otherDescription,
    );
    await page.fill(
      UniqueSelectors.otherDescriptionWelshTextbox,
      ManageFlagsAddTranslationsContent.otherDescriptionWelsh,
    );
    await page.fill(
      UniqueSelectors.flagCommentsWelshTextbox,
      ManageFlagsAddTranslationsContent.flagCommentsWelsh,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
