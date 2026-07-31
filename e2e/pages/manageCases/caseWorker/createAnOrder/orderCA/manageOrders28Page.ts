import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.js";
import { Helpers } from "../../../../../common/helpers.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { ManageOrders28CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders28CAContent.js";

enum UniqueSelectors {
  respondentOptionYes = "#serveToRespondentOptions-Yes",
  respondentOptionNo = "#serveToRespondentOptions-No",
  respondentsOptionsCourtBailiff = "#personallyServeRespondentsOptions-courtBailiff",
  cafcassCymruServedOptionsNo = "#cafcassCymruServedOptions_No",
  serveToAdditionalOrg_Post = "#serveOrgDetailsList_0_serveByPostOrEmail-post",
  additionalOrgNameInput = "#serveOrgDetailsList_0_postalInformation_postalName",
  additionalOrgPostcodeInput = "#serveOrgDetailsList_0_postalInformation_postalAddress_postalAddress_postcodeInput",
  additionalOrgAddressDropDown = "#serveOrgDetailsList_0_postalInformation_postalAddress_postalAddress_addressList",
  additionalOrgBuildingAndStreetInput = "#serveOrgDetailsList_0_postalInformation_postalAddress__detailAddressLine1",
}

export class ManageOrders28Page {
  public static async manageOrders28Page(
    page: Page,
    accessibilityTest: boolean,
    personallyServed: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await page.pause();
    if (errorMessaging) await this.checkErrorMessaging(page);
    await this.fillInFields(page, personallyServed);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${ManageOrders28CAContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders28CAContent.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders28CAContent.formHint}"):visible`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.hiddenformLabel1}"):visible`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.hiddenformLabel2}"):visible`,
        1,
      ),
    ]);
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await Helpers.clickCheckbox(
      page,
      `${ManageOrders28CAContent.anotherOrgLabel}`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.addNew}")`,
    );
    await page.click(UniqueSelectors.serveToAdditionalOrg_Post);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${ManageOrders28CAContent.servedPersonallyErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${ManageOrders28CAContent.servedPersonallyErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${ManageOrders28CAContent.cafcassNeedToBeServedErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${ManageOrders28CAContent.cafcassNeedToBeServedErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${ManageOrders28CAContent.additionalOrgNameRquiredErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${ManageOrders28CAContent.additionalOrgNameRquiredErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${ManageOrders28CAContent.additionalOrgAddressRequiredErrorMsg}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${ManageOrders28CAContent.additionalOrgPostcodeRequiredErrorMsg}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    personallyServed: boolean,
  ): Promise<void> {
    if (personallyServed) {
      await page.check(`${UniqueSelectors.respondentOptionYes}`);
      await this.hiddenFormLabels(page);
      await page.check(`${UniqueSelectors.respondentsOptionsCourtBailiff}`);
    } else {
      await page.check(`${UniqueSelectors.respondentOptionNo}`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Applicant)")`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Respondent)")`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel2}"):visible`,
        1,
      );
    }
    await page.check(`${UniqueSelectors.cafcassCymruServedOptionsNo}`);
    if (await page.isVisible(UniqueSelectors.additionalOrgPostcodeInput)) {
      await page.fill(
        UniqueSelectors.additionalOrgNameInput,
        ManageOrders28CAContent.additionalOrgName,
      );
      await page.fill(
        UniqueSelectors.additionalOrgPostcodeInput,
        ManageOrders28CAContent.additionalOrgPostcode,
      );
      await page.click(
        `${Selectors.button}:text-is("${CommonStaticText.findAddress}")`,
      );
      await page.selectOption(
        UniqueSelectors.additionalOrgAddressDropDown,
        ManageOrders28CAContent.additionalOrgAddress,
      );
      Helpers.checkVisibleAndPresent(
        page,
        UniqueSelectors.additionalOrgBuildingAndStreetInput,
        1,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
