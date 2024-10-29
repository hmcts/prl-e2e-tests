import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentDetailsAddressManualContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressManualContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { otherProceedingsRadios } from "../../../../../common/types";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface RespondentDetailsAddressManualPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  otherProceedingsRadios: otherProceedingsRadios;
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

export class RespondentDetailsAddressManualPage {
  public static async respondentDetailsAddressManualPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    otherProceedingsRadios: otherProceedingsRadios,
  }: RespondentDetailsAddressManualPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page });
    }
    await this.fillInFields({
      page,
      otherProceedingsRadios,
    });
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
      `${Selectors.GovukCaptionXL}:has-text("${RespondentDetailsAddressManualContent.pageTitle}")`,
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
    for (const { selector, expectedText } of addressFields) {
      const actualValue = await page.locator(selector).inputValue();
      expect(actualValue).toBe(expectedText);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
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
    otherProceedingsRadios: otherProceedingsRadios,
  }: Partial<RespondentDetailsAddressManualPageOptions>): Promise<void> {
    if (!page) {
      throw new Error(
        "Page object is undefined. Ensure that a valid Playwright Page instance is passed to the function.",
      );
    }
    switch (otherProceedingsRadios) {
      case "Yes":
        await page.click(UniqueSelectors.lessThan5YearsYes);
        await page.fill(
          UniqueSelectors.yesInput,
          RespondentDetailsAddressManualContent.loremIpsumYes,
        );
        break;
      case "No":
        await page.click(UniqueSelectors.lessThan5YearsNo);
        break;
      case "Don't know":
        await page.click(UniqueSelectors.lessThan5YearsDontKnow);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
