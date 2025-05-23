import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { RespondentDetailsAddressLookupContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressLookupContent.ts";

interface respondentDetailsAddressLookupOptions {
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
  postcodeLookup = "#PostCode",
  manualAddress = "#enterAddressManually",
}

export class RespondentDetailsAddressLookupPage {
  public static async respondentDetailsAddressLookupPage({
    page,
    accessibilityTest,
    errorMessaging,
    addressLookup,
  }: respondentDetailsAddressLookupOptions): Promise<void> {
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
      `${Selectors.GovukHeadingL}:has-text("${RespondentDetailsAddressLookupContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RespondentDetailsAddressLookupContent.label}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${RespondentDetailsAddressLookupContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${RespondentDetailsAddressLookupContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsAddressLookupContent.errorMessage}")`,
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
        RespondentDetailsAddressLookupContent.postcodeText,
      );
      await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
      );
    } else {
      await page.click(inputIds.manualAddress);
    }
  }
}
