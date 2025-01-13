import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { ReasonableAdjustmentsSelectionContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsSelectionContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  helpCommunicatingAndUnderstandingCheckbox = "#_enabled-PF0001-RA0001-RA0008",
  noSupportNeededCheckbox = "#_enabled-0",
}

// This page belongs to the CUI Reasonable Adjustments common component (cui ra)
export class ReasonableAdjustmentsSelectionPage {
  public static async reasonableAdjustmentsSelectionPage(
    page: Page,
    needsReasonableAdjustment: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page);
    await this.fillInFields(page, needsReasonableAdjustment);
    await this.continue(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    // Not a comprehensive check as this page is handled by cui ra
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ReasonableAdjustmentsSelectionContent.govUkHeadingL,
      })
      .waitFor();
    await Helpers.checkGroup(
      page,
      8,
      ReasonableAdjustmentsSelectionContent,
      `checkboxLabel`,
      `${Selectors.GovukLabel}`,
    );
  }

  private static async fillInFields(
    page: Page,
    needsReasonableAdjustment: boolean,
  ): Promise<void> {
    // Not a comprehensive check as this page is handled by cui ra
    if (needsReasonableAdjustment) {
      await page.check(
        UniqueSelectors.helpCommunicatingAndUnderstandingCheckbox,
      );
    } else {
      await page.check(UniqueSelectors.noSupportNeededCheckbox);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
