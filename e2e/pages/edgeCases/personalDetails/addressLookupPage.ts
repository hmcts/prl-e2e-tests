import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { AddressLookupContent } from "../../../fixtures/edgeCases/personalDetails/addressLookupContent.ts";
interface AddressLookupPageOptions {
  page: Page;
  accessibilityTest: boolean;
  manualAddress: boolean;
}

enum UniqueSelectors {
  postcode = "#applicantAddressPostcode",
}

export class AddressLookupPage {
  public static async addressLookup({
    page,
    accessibilityTest,
    manualAddress,
  }: AddressLookupPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (manualAddress) {
      await page.click(
        `${Selectors.GovukLink}:text-is("${AddressLookupContent.link}")`,
      );
    } else {
      await this.fillInPostcode(page);
      await page.click(Selectors.edgeCaseContinue);
    }
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${AddressLookupContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${AddressLookupContent.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${AddressLookupContent.label}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${AddressLookupContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInPostcode(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.postcode,
      AddressLookupContent.postcodeInput,
    );
  }
}
