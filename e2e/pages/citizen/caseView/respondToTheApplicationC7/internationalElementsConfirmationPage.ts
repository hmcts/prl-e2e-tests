import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { InternationalElementsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/internationalElementsContent.ts";

export class InternationalElementsConfirmationPage {
  public static async internationalElementsConfirmationPage(
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
        hasText: InternationalElementsContent.page5h1,
      })
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLink}:text-is("${InternationalElementsContent.editLink}")`,
      4,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.headingH2}:text-is("${InternationalElementsContent.page5h2}")`,
      1,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
