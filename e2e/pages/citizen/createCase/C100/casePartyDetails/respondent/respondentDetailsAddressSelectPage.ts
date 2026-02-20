import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { RespondentDetailsAddressSelectContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressSelectContent";
import { RespondentDetailsAddressLookupContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsAddressLookupContent";

interface respondentDetailsAddressSelectOptions {
  page: Page;
  accessibilityTest: boolean;
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
    addressLookupSuccessful,
  }: respondentDetailsAddressSelectOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${RespondentDetailsAddressSelectContent.h2}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${RespondentDetailsAddressSelectContent.label}")`, // checking that the postcode put in on the previous page is displaying on this page correctly
        1,
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
      await new AxeUtils(page).audit();
    }
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
