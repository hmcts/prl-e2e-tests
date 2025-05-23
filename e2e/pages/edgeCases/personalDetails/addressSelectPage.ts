import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { AddressSelectContent } from "../../../fixtures/edgeCases/personalDetails/addressSelectContent.ts";

interface AddressSelectPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  selectAddress = "#applicantSelectAddress",
}

export class AddressSelectPage {
  public static async addressSelectPage({
    page,
    accessibilityTest,
  }: AddressSelectPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectOption(page);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${AddressSelectContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        AddressSelectContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddressSelectContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${AddressSelectContent.formHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async selectOption(page: Page): Promise<void> {
    await page.selectOption(
      UniqueSelectors.selectAddress,
      AddressSelectContent.selectAddressOption,
    );
  }
}
