import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ApplicantAddressManualContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicant/applicantAddressManualContent.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";

interface applicantAddressManualOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  prevAddress5Years: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
  prevAddress5Years: boolean;
}

enum inputIds {
  building = "#address1",
  street = " #address2",
  town = " #addressTown",
  county = "#addressCounty",
  country = "#country",
  postcode = "#addressPostcode",
  addressHistoryYes = "#addressHistory",
  addressHistoryNo = "#addressHistory-2",
  hiddenPrevAddress = "#provideDetailsOfPreviousAddresses",
}

export class ApplicantAddressManualPage {
  public static async applicantAddressManualPage({
    page,
    accessibilityTest,
    errorMessaging,
    prevAddress5Years,
  }: applicantAddressManualOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      errorMessaging,
      prevAddress5Years,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:has-text("${ApplicantAddressManualContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        8,
        ApplicantAddressManualContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${ApplicantAddressManualContent.fieldset}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page); //#TODO turn back on once Accessibility Issues: PRL-6590 has been fixed (rerun 20/01/25, issue still exists)
    }
  }
  private static async triggerErrorMessages(page: Page): Promise<void> {
    await this.clearFormFields(page);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantAddressManualContent,
        "errorMessage",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantAddressManualContent,
        "errorMessage",
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
    await page.click(inputIds.addressHistoryYes); //check hidden error message
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorMessageCitizen}:has-text("${ApplicantAddressManualContent.hiddenErrorMessage1}")`,
    );
  }

  private static async clearFormFields(page: Page): Promise<void> {
    await page.fill(inputIds.building, "");
    await page.fill(inputIds.street, "");
    await page.fill(inputIds.town, "");
    await page.fill(inputIds.county, "");
    await page.fill(inputIds.postcode, "");
    await page.fill(inputIds.country, "");
  }

  private static async fillInFields({
    page,
    prevAddress5Years,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      inputIds.building,
      ApplicantAddressManualContent.inputStreetAddress,
    );
    await page.fill(inputIds.town, ApplicantAddressManualContent.inputCity);
    await page.fill(inputIds.county, ApplicantAddressManualContent.inputCounty);
    await page.fill(inputIds.postcode, ApplicantAddressManualContent.inputZip);
    await page.fill(
      inputIds.country,
      ApplicantAddressManualContent.inputCountry,
    );
    if (prevAddress5Years) {
      await page.click(inputIds.addressHistoryYes);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${ApplicantAddressManualContent.hiddenLabel}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${ApplicantAddressManualContent.hiddenHint}")`,
          1,
        ),
      ]);
      await page.fill(
        inputIds.hiddenPrevAddress,
        ApplicantAddressManualContent.inputPrevAddress,
      );
    } else {
      await page.click(inputIds.addressHistoryNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
