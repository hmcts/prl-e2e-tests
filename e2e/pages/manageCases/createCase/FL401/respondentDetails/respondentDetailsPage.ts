import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentDetailsContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentDetails/respondentDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum nameFieldIds {
  firstName = "#respondentsFL401_firstName",
  lastName = "#respondentsFL401_lastName",
}

enum radioIdsYes {
  isDateOfBirthKnown_Yes = "#respondentsFL401_isDateOfBirthKnown_Yes",
  respondentLivedWithApplicant_Yes = "#respondentsFL401_respondentLivedWithApplicant_Yes",
  isCurrentAddressKnown_Yes = "#respondentsFL401_isCurrentAddressKnown_Yes",
  canYouProvideEmailAddress_Yes = "#respondentsFL401_canYouProvideEmailAddress_Yes",
  canYouProvidePhoneNumber_Yes = "#respondentsFL401_canYouProvidePhoneNumber_Yes",
}

enum radioIdsNo {
  isDateOfBirthKnown_No = "#respondentsFL401_isDateOfBirthKnown_No",
  respondentLivedWithApplicant_No = "#respondentsFL401_respondentLivedWithApplicant_No",
  isCurrentAddressKnown_No = "#respondentsFL401_isCurrentAddressKnown_No",
  canYouProvideEmailAddress_No = "#respondentsFL401_canYouProvideEmailAddress_No",
  canYouProvidePhoneNumber_No = "#respondentsFL401_canYouProvidePhoneNumber_No",
}

enum inputFieldIds {
  dateOfBirth_day = "#dateOfBirth-day",
  dateOfBirth_month = "#dateOfBirth-month",
  dateOfBirth_year = "#dateOfBirth-year",
  address_postcodeInput = "#respondentsFL401_address_address_postcodeInput",
  email = "#respondentsFL401_email",
  contactNumber = "#respondentsFL401_phoneNumber",
  addressList = "select#respondentsFL401_address_address_addressList",
}

export class RespondentDetailsPage {
  public static async respondentDetailsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    respondentDetailsAllOptionsYes: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(
      page,
      respondentDetailsAllOptionsYes,
      accessibilityTest,
    );
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
      Helpers.checkGroup(
        page,
        8,
        RespondentDetailsContent,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(radioIdsYes.canYouProvideEmailAddress_Yes);
    await page.click(radioIdsYes.canYouProvidePhoneNumber_Yes);
    await page.fill(
      `${inputFieldIds.email}`,
      RespondentDetailsContent.invalidEmailAddress,
    );
    await page.fill(
      `${inputFieldIds.contactNumber}`,
      RespondentDetailsContent.invalidContactNumber,
    );

    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorySummaryHeading}:text-is("${RespondentDetailsContent.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${RespondentDetailsContent.errorValidationFailed}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorSummaryList}:text-is("${RespondentDetailsContent.errorInvalidEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorSummaryList}:text-is("${RespondentDetailsContent.errorInvalidContactNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${RespondentDetailsContent.errorInvalidEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${RespondentDetailsContent.errorInvalidContactNumber}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    respondentDetailsAllOptionsYes: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.fill(
      `${nameFieldIds.firstName}`,
      RespondentDetailsContent.exampleFirstName,
    );
    await page.fill(
      `${nameFieldIds.lastName}`,
      RespondentDetailsContent.exampleLastName,
    );

    if (respondentDetailsAllOptionsYes) {
      for (let selector of Object.values(radioIdsYes)) {
        await page.click(selector);
      }

      await this.checkPopupTextLoads(page, accessibilityTest);

      await page.fill(
        `${inputFieldIds.dateOfBirth_day}`,
        RespondentDetailsContent.exampleDay,
      );
      await page.fill(
        `${inputFieldIds.dateOfBirth_month}`,
        RespondentDetailsContent.exampleMonth,
      );
      await page.fill(
        `${inputFieldIds.dateOfBirth_year}`,
        RespondentDetailsContent.exampleYear,
      );
      await page.fill(
        `${inputFieldIds.address_postcodeInput}`,
        RespondentDetailsContent.examplePostCode,
      );
      await page.fill(
        `${inputFieldIds.email}`,
        RespondentDetailsContent.exampleEmailAddress,
      );
      await page.fill(
        `${inputFieldIds.contactNumber}`,
        RespondentDetailsContent.exampleContactNumber,
      );

      await this.checkFindAddressWorks(page, accessibilityTest);
    } else {
      for (let selector of Object.values(radioIdsNo)) {
        await page.click(selector);
      }
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

  private static async checkFindAddressWorks(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RespondentDetailsContent.findAddress}")`,
    );

    await page.selectOption(`${inputFieldIds.addressList}`, {
      label: `${RespondentDetailsContent.buckinghamPalace}`,
    });

    const dropdown = await page.$(`${inputFieldIds.addressList}`);

    const receivedAddresses = await dropdown?.evaluate((select) =>
      Array.from(select.options).map((option) => option.text.trim()),
    );

    expect(receivedAddresses).toEqual(
      RespondentDetailsContent.expectedAddresses,
    );

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
