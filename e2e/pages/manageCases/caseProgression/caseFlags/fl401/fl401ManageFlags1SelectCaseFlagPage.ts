import { Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401ManageFlags1SelectCaseFlagContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1SelectCaseFlagContent.ts";

enum UniqueSelectors {
  caseFlagRadio = "#flag-selection-0",
}

export class Fl401ManageFlags1SelectCaseFlagPage {
  public static async fl401ManageFlags1SelectCaseFlagPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, supportType, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFieldsetHeading, {
        hasText: Fl401ManageFlags1SelectCaseFlagContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401ManageFlags1SelectCaseFlagContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (supportType === "reasonableAdjustment") {
      if (caseType === "C100") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${Fl401ManageFlags1SelectCaseFlagContent.c100GovUkLabelReasonableAdjustment}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${Fl401ManageFlags1SelectCaseFlagContent.fl401GovUkLabelReasonableAdjustment}")`,
          1,
        );
      }
    } else {
      if (caseType === "C100") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${Fl401ManageFlags1SelectCaseFlagContent.c100GovUkLabelLanguageInterpreter}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${Fl401ManageFlags1SelectCaseFlagContent.fl401GovUkLabelLanguageInterpreter}")`,
          1,
        );
      }
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.caseFlagRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
