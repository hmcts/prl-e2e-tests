import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { LegalRepresentationC7Content } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/legalRepresentationContent.ts";

enum UniqueSelectors {
  optionRadio = "#legalRepresentation-2",
}

export class LegalRepresentationConfirmationPage {
  public static async legalRepresentationConfirmationPage(
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
      .locator(Selectors.GovukHeadingL, {
        hasText: LegalRepresentationC7Content.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:has-text("${LegalRepresentationC7Content.li}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${LegalRepresentationC7Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${LegalRepresentationC7Content.strong}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        4,
        LegalRepresentationC7Content,
        "p",
        Selectors.p,
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
