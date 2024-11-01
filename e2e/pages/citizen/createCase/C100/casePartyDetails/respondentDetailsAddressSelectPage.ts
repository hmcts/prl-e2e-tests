import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { RespondentDetailsAddressSelectContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressSelectContent";
import { RespondentDetailsAddressLookupContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondentDetailsAddressLookupContent";

interface respondentDetailsAddressSelectOptions {
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

export class RespondentDetailsAddressSelectPage {
  public static async respondentDetailsAddressSelectPage({
    page,
    accessibilityTest,
    errorMessaging,
    addressLookupSuccessful,
  }: respondentDetailsAddressSelectOptions): Promise<void> {
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
      `${Selectors.GovukHeadingL}:has-text("${RespondentDetailsAddressSelectContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsAddressSelectContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsAddressSelectContent,
        "link",
        Selectors.GovukLink,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${RespondentDetailsAddressLookupContent.postcodeText}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${RespondentDetailsAddressSelectContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsAddressSelectContent.errorMessage}")`,
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
        label: `${RespondentDetailsAddressSelectContent.address}`,
      });
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
    } else {
      await page.click(`${inputIds.cannotFindAddress}`);
    }
  }
}
