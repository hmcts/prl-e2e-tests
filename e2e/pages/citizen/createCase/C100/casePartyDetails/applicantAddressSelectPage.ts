import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantAddressLookupContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantAddressLookupContent";
import { ApplicantAddressSelectContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantAddressSelectContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface applicantAddressSelectOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  addressLookupSuccessful: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  addressLookupSuccessful: boolean;
}

enum inputIds {
  selectAddress = "#selectAddress",
  cannotFindAddress = "#cannotFindAddress",
}

export class ApplicantAddressSelectPage {
  public static async applicantAddressSelectPage({
    page,
    accessibilityTest,
    errorMessaging,
    addressLookupSuccessful,
  }: applicantAddressSelectOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      addressLookupSuccessful,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:has-text("${ApplicantAddressSelectContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${ApplicantAddressSelectContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ApplicantAddressSelectContent.label}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantAddressSelectContent,
        "link",
        Selectors.GovukLink,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${ApplicantAddressLookupContent.postcodeText}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ApplicantAddressSelectContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ApplicantAddressSelectContent.errorMessage}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
    addressLookupSuccessful,
  }: fillInFieldsOptions): Promise<void> {
    if (addressLookupSuccessful) {
      await page.selectOption(`${inputIds.selectAddress}`, {
        label: `${ApplicantAddressSelectContent.address}`,
      });
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
    } else {
      await page.click(`${inputIds.cannotFindAddress}`);
    }
  }
}
