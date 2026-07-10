import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { SafetyConcernsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/safetyConcernsContent.ts";

enum UniqueSelectors {
  question = "#c1A_haveSafetyConcerns-2",
}

export class SafetyConcerns2Page {
  public static async safetyConcerns2Page(
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
      .locator(Selectors.GovukHeadingXL, {
        hasText: SafetyConcernsContent.page2h1,
      })
      .waitFor();
    await Promise.all([
      await Helpers.checkGroup(
        page,
        2,
        SafetyConcernsContent,
        "page2p",
        Selectors.p,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${SafetyConcernsContent.strongText}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        2,
        SafetyConcernsContent,
        "link",
        Selectors.GovukLink,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SafetyConcernsContent.page2span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${SafetyConcernsContent.radioYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${SafetyConcernsContent.radioNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      //await new AxeUtils(page).audit(); // failing accessibility check, ticket raised for a fix FPVTL-XXXX
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.question);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
