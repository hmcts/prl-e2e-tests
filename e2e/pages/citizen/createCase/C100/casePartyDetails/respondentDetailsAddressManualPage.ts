import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentDetailsAddressManualContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressManualContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { yesNoDontKnow } from "../../../../../common/types";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface RespondentDetailsAddressManualPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respAddress5Years: yesNoDontKnow;
  respAddressLookup: boolean;
}

enum addressUniqueSelectors {
  buildingAndStreet = "#AddressLine1",
  townAndCity = "#PostTown",
  county = "#County",
  postcode = "#PostCode",
  country = "#Country",
}

enum UniqueSelectors {
  iDontKnowWhereTheyCurrentlyLive = "#addressUnknown",
  lessThan5YearsYes = "#addressHistory",
  lessThan5YearsNo = "#addressHistory-2",
  lessThan5YearsDontKnow = "#addressHistory-3",
  yesInput = "#provideDetailsOfPreviousAddresses",
}

enum addressText {
  buildingAndStreet = "185 APARTMENT 10, BLOCK A TY NANT, HIGH STREET",
  townAndCity = "SWANSEA",
  county = "SWANSEA",
  postcode = "SA1 1AD",
  country = "United Kingdom",
}

const addressFields = [
  {
    selector: addressUniqueSelectors.buildingAndStreet,
    expectedText: addressText.buildingAndStreet,
  },
  {
    selector: addressUniqueSelectors.townAndCity,
    expectedText: addressText.townAndCity,
  },
  {
    selector: addressUniqueSelectors.county,
    expectedText: addressText.county,
  },
  {
    selector: addressUniqueSelectors.postcode,
    expectedText: addressText.postcode,
  },
  {
    selector: addressUniqueSelectors.country,
    expectedText: addressText.country,
  },
];

export class RespondentDetailsAddressManualPage {
  public static async respondentDetailsAddressManualPage({
    page,
    accessibilityTest,
    errorMessaging,
    respAddress5Years,
    respAddressLookup,
  }: RespondentDetailsAddressManualPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (respAddressLookup) {
      await this.checkFilledData(page);
    }
    if (errorMessaging) {
      await this.triggerErrorMessages({ page });
    }
    await this.fillInFields({
      page,
      respAddress5Years,
      respAddressLookup,
    });
  }

  private static async checkFilledData(page: Page): Promise<void> {
    for (const { selector, expectedText } of addressFields) {
      const actualValue = await page.locator(selector).inputValue();
      expect(actualValue).toBe(expectedText);
    }
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<RespondentDetailsAddressManualPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${RespondentDetailsAddressManualContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${RespondentDetailsAddressManualContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        RespondentDetailsAddressManualContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RespondentDetailsAddressManualContent.govukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.dontKnow}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); Accessibility Issues: PRL-6590
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<RespondentDetailsAddressManualPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${RespondentDetailsAddressManualContent.errorDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsAddressManualContent.errorDetails}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    respAddress5Years,
    respAddressLookup,
  }: Partial<RespondentDetailsAddressManualPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    if (!respAddressLookup) {
      for (const { selector, expectedText } of addressFields) {
        await page.fill(selector, expectedText);
      }
    }
    switch (respAddress5Years) {
      case "yes":
        await page.click(UniqueSelectors.lessThan5YearsYes);
        await page.fill(
          UniqueSelectors.yesInput,
          RespondentDetailsAddressManualContent.loremIpsumYes,
        );
        break;
      case "no":
        await page.click(UniqueSelectors.lessThan5YearsNo);
        break;
      case "dontKnow":
        await page.click(UniqueSelectors.lessThan5YearsDontKnow);
        break;
      default:
        throw new Error(
          `Unrecognised value for yesNoDontKnow: ${respAddress5Years}`,
        );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
