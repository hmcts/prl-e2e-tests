import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { LanguageRequirementsAndSpecialArrangementsContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  specialArrangementsInput = "#ra_languageReqAndSpecialArrangements",
}

export class LanguageRequirementsAndSpecialArrangementsPage {
  public static async languageRequirementsAndSpecialArrangementsPage(
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
      .locator(Selectors.GovukHeadingXL, {
        hasText:
          LanguageRequirementsAndSpecialArrangementsContent.govUkHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${LanguageRequirementsAndSpecialArrangementsContent.govUkCaptionL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        LanguageRequirementsAndSpecialArrangementsContent,
        `govUkHeadingM`,
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        LanguageRequirementsAndSpecialArrangementsContent,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        9,
        LanguageRequirementsAndSpecialArrangementsContent,
        `li`,
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${LanguageRequirementsAndSpecialArrangementsContent.span1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${LanguageRequirementsAndSpecialArrangementsContent.govUkLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${LanguageRequirementsAndSpecialArrangementsContent.govUkHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.specialArrangementsInput,
      LanguageRequirementsAndSpecialArrangementsContent.specialArrangementsInput,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
