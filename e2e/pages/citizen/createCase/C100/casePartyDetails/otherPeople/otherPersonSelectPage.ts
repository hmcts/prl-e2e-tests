import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonSelectContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonSelectContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { ApplicantAddressSelectContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantAddressSelectContent.ts";

interface otherPersonSelectOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

const selectAddress = "#selectAddress";

export class OtherPersonSelectPage {
  public static async otherPersonSelectPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: otherPersonSelectOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherPersonSelectContent.pageTitle} ${OtherPersonSelectContent.firstNameLastName}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantAddressSelectContent.h2}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ApplicantAddressSelectContent.label}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherPersonSelectContent,
        "link",
        `${Selectors.a}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${OtherPersonSelectContent.postcodeText}")`,
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
        `${Selectors.a}:text-is("${OtherPersonSelectContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonSelectContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
  }: fillInFieldsOptions): Promise<void> {
    await page.selectOption(`${selectAddress}`, {
      label: `${OtherPersonSelectContent.address}`,
    });
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
