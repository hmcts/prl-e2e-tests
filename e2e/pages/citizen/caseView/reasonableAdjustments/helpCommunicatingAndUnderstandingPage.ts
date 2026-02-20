import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { HelpCommunicatingAndUnderstandingContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/helpCommunicatingAndUnderstandingContent";

enum UniqueSelectors {
  lipSpeakerCheckbox = "#_enabled-PF0001-RA0001-RA0008-RA0041",
}

// This page belongs to the CUI Reasonable Adjustments common component (cui ra)
export class HelpCommunicatingAndUnderstandingPage {
  public static async helpCommunicatingAndUnderstandingPage(
    page: Page,
  ): Promise<void> {
    await this.checkPageLoads(page);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    // Not a comprehensive check as this page is handled by cui ra
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: HelpCommunicatingAndUnderstandingContent.govUkHeadingL,
      })
      .waitFor();
  }

  private static async fillInFields(page: Page): Promise<void> {
    // Not a comprehensive check as this page is handled by cui ra
    await page.check(UniqueSelectors.lipSpeakerCheckbox);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
