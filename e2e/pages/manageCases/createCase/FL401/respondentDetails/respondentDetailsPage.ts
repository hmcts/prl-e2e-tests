import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentDetailsContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentDetails/respondentDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum fieldIds {
  firstName = "#respondentsFL401_firstName",
  lastName = "#respondentsFL401_lastName",
  isDateOfBirthKnown_Yes = "#respondentsFL401_isDateOfBirthKnown_Yes",
  isDateOfBirthKnown_No = "#respondentsFL401_isDateOfBirthKnown_No",
  respondentLivedWithApplicant_Yes = "#respondentsFL401_respondentLivedWithApplicant_Yes",
  respondentLivedWithApplicant_No = "#respondentsFL401_respondentLivedWithApplicant_No",
  isCurrentAddressKnown_Yes = "#respondentsFL401_isCurrentAddressKnown_Yes",
  isCurrentAddressKnown_No = "#respondentsFL401_isCurrentAddressKnown_No",
  canYouProvideEmailAddress_Yes = "#respondentsFL401_canYouProvideEmailAddress_Yes",
  canYouProvideEmailAddress_No = "#respondentsFL401_canYouProvideEmailAddress_No",
  canYouProvidePhoneNumber_Yes = "#respondentsFL401_canYouProvidePhoneNumber_Yes",
  canYouProvidePhoneNumber_No = "#respondentsFL401_canYouProvidePhoneNumber_No",
  dateOfBirth_day = "#dateOfBirth-day",
  dateOfBirth_month = "#dateOfBirth-month",
  dateOfBirth_year = "#dateOfBirth-year",
  address_postcodeInput = "#respondentsFL401_address_address_postcodeInput",
  email = "#respondentsFL401_email",
}

const exampleFirstName = "firstName";
const exampleLastName = "lastName";
const exampleDay = "12";
const exampleMonth = "10";
const exampleYear = "2008";
const examplePostCode = "AB1 CDE";
const exampleEmailAddress = "repondent1@example.net";

export class RespondentDetailsPage {
  public static async respondentDetailsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    allOptionsYes: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, allOptionsYes, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.headingH2}:text-is("${RespondentDetailsContent.subTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RespondentDetailsContent.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RespondentDetailsContent.textOnPage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel5}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel6}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel7}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabel9}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RespondentDetailsContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${RespondentDetailsContent.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${RespondentDetailsContent.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    allOptionsYes: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.fill(`${fieldIds.firstName}`, exampleFirstName);
    await page.fill(`${fieldIds.lastName}`, exampleLastName);

    if (allOptionsYes) {
      await page.click(fieldIds.isDateOfBirthKnown_Yes);
      await page.click(fieldIds.respondentLivedWithApplicant_Yes);
      await page.click(fieldIds.isCurrentAddressKnown_Yes);
      await page.click(fieldIds.canYouProvideEmailAddress_Yes);
      await page.click(fieldIds.canYouProvidePhoneNumber_Yes);

      await this.checkPopupTextLoads(page, accessibilityTest);

      await page.fill(`${fieldIds.dateOfBirth_day}`, exampleDay);
      await page.fill(`${fieldIds.dateOfBirth_month}`, exampleMonth);
      await page.fill(`${fieldIds.dateOfBirth_year}`, exampleYear);

      await page.fill(`${fieldIds.address_postcodeInput}`, examplePostCode);
      await page.fill(`${fieldIds.email}`, exampleEmailAddress);
    } else {
      await page.click(fieldIds.isDateOfBirthKnown_No);
      await page.click(fieldIds.respondentLivedWithApplicant_No);
      await page.click(fieldIds.isCurrentAddressKnown_No);
      await page.click(fieldIds.canYouProvideEmailAddress_No);
      await page.click(fieldIds.canYouProvidePhoneNumber_No);
    }

    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.continue}")`,
    );
  }

  private static async checkPopupTextLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabelPopUp1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabelPopUp2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabelPopUp3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RespondentDetailsContent.formLabelPopUp4}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
