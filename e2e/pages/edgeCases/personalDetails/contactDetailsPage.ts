import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { ContactDetailsContent } from "../../../fixtures/edgeCases/personalDetails/contactDetailsContent.ts";

interface ContactDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  phoneNumber = "#applicantPhoneNumber",
}

export class ContactDetailsPage {
  public static async contactDetailsPage({
    page,
    accessibilityTest,
  }: ContactDetailsPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${ContactDetailsContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactDetailsContent.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactDetailsContent.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.phoneNumber,
      ContactDetailsContent.inputPhoneNumber,
    );
  }
}
