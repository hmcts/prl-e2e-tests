import { Page } from "@playwright/test";
import {
  solicitorCaseCreateType,
  SupportType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageFlagsSelectCaseFlagContent } from "../../../../fixtures/manageCases/caseProgression/caseFlags/manageFlagsSelectCaseFlagContent.ts";

enum UniqueSelectors {
  caseFlagRadio = "#flag-selection-0",
}

export class ManageFlagsSelectCaseFlagPage {
  public static async manageFlagsSelectCaseFlagPage(
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
        hasText: ManageFlagsSelectCaseFlagContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageFlagsSelectCaseFlagContent.govUkHeadingL}")`,
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
          `${Selectors.GovukLabel}:has-text("${ManageFlagsSelectCaseFlagContent.c100GovUkLabelReasonableAdjustment}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${ManageFlagsSelectCaseFlagContent.fl401GovUkLabelReasonableAdjustment}")`,
          1,
        );
      }
    } else {
      if (caseType === "C100") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${ManageFlagsSelectCaseFlagContent.c100GovUkLabelLanguageInterpreter}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${ManageFlagsSelectCaseFlagContent.fl401GovUkLabelLanguageInterpreter}")`,
          1,
        );
      }
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
