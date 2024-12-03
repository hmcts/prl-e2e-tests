import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders24CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24CAContent";
import { uploadOrderFL401Options } from "../../../../../common/types";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import {
  ManageOrders3DAContent
} from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders3DAContent";

interface manageOrders3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
}

enum UniqueSelectors {
  powerOfArrest = "#domesticAbuseOrders-powerOfArrest",
  nonMolestation = "#domesticAbuseOrders-nonMolestationOrderFL401A",
  occupationOrder = "#domesticAbuseOrders-occupationOrder",
  amendDischargeVariedOrder = "#domesticAbuseOrders-amendedDischargedVariedOrder",
  blankOrderFL404B = "#domesticAbuseOrders-blankOrder",
  generalFormOfUndertaking = "#domesticAbuseOrders-generalFormOfUndertaking",
  warrantOfArrest = "#domesticAbuseOrders-warrantOfArrest",
  remandOrder = "#domesticAbuseOrders-remandOrder",
  formForTakingRecognizance = "#domesticAbuseOrders-recognizance",
  formForTakingSurety = "#domesticAbuseOrders-surveyForm",
  bailNotice = "#domesticAbuseOrders-bailNotice",
  hospitalOrder = "#domesticAbuseOrders-hospitalOrder",
  guardianshipOrder = "#domesticAbuseOrders-guardianshipOrder",
  statementOfService = "#domesticAbuseOrders-statementOfService",
  blankOrderFL514 = "#domesticAbuseOrders-blankOrderFL415",
  noticeToLandlordOrMortgageCompany = "#domesticAbuseOrders-landlordOrMortgageNotice",
  consent_Yes = "#isTheOrderUploadedByConsent_Yes",
  consent_No = "#isTheOrderUploadedByConsent_No",
}

export class ManageOrders3Page {
  public static async manageOrders3Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderFL401Options,
  }: manageOrders3PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      uploadOrderFL401Options,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders3PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders24CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ManageOrders3DAContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders3DAContent.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        23,
        ManageOrders3DAContent,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.summonsToAppearAtCourt}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.warrantToSecureAttendanceAtCourt}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.orderOnDeterminationOfProceedingsForContemptOfCourt}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.warrantOfCommittal}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.powerOfArrest}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.nonMolestation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.occupationOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.amendDischargeVariedOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.blankOrderFL404B}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.generalFormOfUndertaking}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.warrantOfArrest}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.remandOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.formForTakingRecognizance}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.formForTakingSurety}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.bailNotice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.hospitalOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.guardianshipOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.statementOfService}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.blankOrderFL514}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders3DAContent.noticeToLandlordOrMortgageCompany}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
    uploadOrderFL401Options,
  }: Partial<manageOrders3PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (uploadOrderFL401Options) {
      case "non-molestation":
        await page.click(UniqueSelectors.nonMolestation);
        break;
      case "occupation order":
        await page.click(UniqueSelectors.occupationOrder);
        break;
      case "amend discharge varied order":
        await page.click(UniqueSelectors.amendDischargeVariedOrder);
        break;
      case "general form of undertaking":
        await page.click(UniqueSelectors.generalFormOfUndertaking);
        break;
      case "power of arrest":
        await page.click(UniqueSelectors.powerOfArrest);
        break;
      case "warrant of arrest":
        await page.click(UniqueSelectors.warrantOfArrest);
        break;
      case "remand order":
        await page.click(UniqueSelectors.remandOrder);
        break;
      case "form for taking recognizance":
        await page.click(UniqueSelectors.formForTakingRecognizance);
        break;
      case "form for taking surety":
        await page.click(UniqueSelectors.formForTakingSurety);
        break;
      case "bail notice":
        await page.click(UniqueSelectors.bailNotice);
        break;
      case "hospital order":
        await page.click(UniqueSelectors.hospitalOrder);
        break;
      case "guardianship order":
        await page.click(UniqueSelectors.guardianshipOrder);
        break;
      case "statement of service":
        await page.click(UniqueSelectors.statementOfService);
        break;
      case "blank order (FL404B)":
        await page.click(UniqueSelectors.blankOrderFL404B);
        break;
      case "blank order (FL514)":
        await page.click(UniqueSelectors.blankOrderFL514);
        break;
      case "Notice landlord mortgage":
        await page.click(UniqueSelectors.noticeToLandlordOrMortgageCompany);
        break;
      default:
        throw new Error("Invalid option");
    }
    if (yesNoManageOrders) {
      await page.click(UniqueSelectors.consent_Yes);
    } else {
      await page.click(UniqueSelectors.consent_No);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
