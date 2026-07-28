import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { SafetyConcernsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/safetyConcernsContent.ts";

export class SafetyConcerns1Page {
  public static async safetyConcerns1Page(
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
        hasText: SafetyConcernsContent.h1,
      })
      .waitFor();
    await Promise.all([
      await Helpers.checkGroup(
        page,
        2,
        SafetyConcernsContent,
        "h2_",
        Selectors.GovukHeadingM,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${SafetyConcernsContent.pBodyL}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        13,
        SafetyConcernsContent,
        "p",
        Selectors.GovukBody,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SafetyConcernsContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${SafetyConcernsContent.strongWarningText}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        6,
        SafetyConcernsContent,
        "li",
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
