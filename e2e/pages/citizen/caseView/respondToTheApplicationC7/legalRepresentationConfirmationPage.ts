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
      .locator(Selectors.headingH1, {
        hasText: LegalRepresentationC7Content.heading1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${LegalRepresentationC7Content.insetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukRadios}:text-is("${LegalRepresentationC7Content.radioNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukRadios}:text-is("${LegalRepresentationC7Content.radioYes}")`,
        1,
      ),
      await Helpers.checkGroup(
        page,
        2,
        LegalRepresentationC7Content,
        "link",
        Selectors.GovukLink,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.optionRadio);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
