import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { AddressManualContent } from "../../fixtures/edgeCases/AddressManualContent.ts";

interface AddressManualOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  buildingStreet1 = "#applicantAddress1",
  buildingStreet2 = "#applicantAddress2",
  town = "#applicantAddressTown",
  county = "#applicantAddressCounty",
  postcode = "#applicantAddressPostcode",
}

export class AddressManualPage {
  public static async addressManual({
    page,
    accessibilityTest,
  }: AddressManualOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInAddress(page);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${AddressManualContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        AddressManualContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      //await AccessibilityTestHelper.run(page);
    }
  }
  private static async fillInAddress(page: Page): Promise<void> {
      await page.fill(
        UniqueSelectors.buildingStreet1,
        AddressManualContent.buildingStreet1,
      );
          await page.fill(
        UniqueSelectors.buildingStreet2,
        AddressManualContent.buildingStreet2,
      );
      await page.fill(UniqueSelectors.town, AddressManualContent.town);
      await page.fill(UniqueSelectors.county, AddressManualContent.county);
      await page.fill(UniqueSelectors.postcode, AddressManualContent.postcode);
  }
}
