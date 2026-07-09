import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { ConfirmContactDetailsContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/confirmContactDetailsContent.ts";

enum UniqueSelectors {
  editContactDetails = "#citizenUserLivingInRefugeText",
}

export class ConfirmContactDetails1Page {
  public static async confirmContactDetails1Page(
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
        hasText: ConfirmContactDetailsContent.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${ConfirmContactDetailsContent.linkEdit}")`,
        8,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ConfirmContactDetailsContent.hint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.editContactDetails);
  }
}
