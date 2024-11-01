import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantAddressLookupContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantAddressLookupContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface applicantAddressLookupOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  addressLookup: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
  addressLookup: boolean;
}

enum inputIds {
  postcodeLookup = "#addressPostcode",
  manualAddress = "#enterAddressManually",
}

export class ApplicantAddressLookupPage {
  public static async applicantAddressLookupPage({
    page,
    accessibilityTest,
    errorMessaging,
    addressLookup,
  }: applicantAddressLookupOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      errorMessaging,
      addressLookup,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:has-text("${ApplicantAddressLookupContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ApplicantAddressLookupContent.label}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantAddressLookupContent.body}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async triggerErrorMessages(page: Page): Promise<void> {
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
        `${Selectors.GovukErrorSummary}:text-is("${ApplicantAddressLookupContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantAddressLookupContent.errorMessage}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
    addressLookup,
  }: fillInFieldsOptions): Promise<void> {
    if (addressLookup) {
      await page.fill(
        inputIds.postcodeLookup,
        ApplicantAddressLookupContent.postcodeText,
      );
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
    } else {
      await page.click(inputIds.manualAddress);
    }
  }
}
