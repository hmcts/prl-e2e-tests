import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { UploadDraftAnOrder3Content } from "../../../../fixtures/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder3Content";

interface UploadDraftAnOrder3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum UniqueSelectors {
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
  childArrangementOrdersBlankOrderOrDirections = "#childArrangementOrders-blankOrderOrDirections",
  childArrangementOrdersCASpecificProhibitedOrder = "#childArrangementOrders-caSpecificProhibitedOrder",
  childArrangementOrdersParentalResponsibilityOrder = "#childArrangementOrders-parentalResponsibilityOrder",
  childArrangementOrdersSplGuardianshipOrder = "#childArrangementOrders-splGuardianshipOrder",
  childArrangementOrdersDeclarationOfParentageOrder = "#childArrangementOrders-declarationOfParentageOrder",
  childArrangementOrdersDiscloseOrder = "#childArrangementOrders-discloseOrder",
  childArrangementOrdersAuthorityC31 = "#childArrangementOrders-authorityC31",
  childArrangementOrdersFamilyAssistOrder = "#childArrangementOrders-familyAssistOrder",
  childArrangementOrdersLeaveToChangeC44 = "#childArrangementOrders-leaveToChangeC44",
  childArrangementOrdersGuardianAppointmentC47A = "#childArrangementOrders-guardianAppointmentC47A",
  childArrangementOrdersSolicitorAppointmentC48A = "#childArrangementOrders-solicitorAppointmentC48A",
  childArrangementOrdersCAEnforcementC80 = "#childArrangementOrders-caEnforcementC80",
  childArrangementOrdersFinancialCompensationC82 = "#childArrangementOrders-financialCompensationC82",
  childArrangementOrdersSummonsFC601 = "#childArrangementOrders-summonsFC601",
  childArrangementOrdersSecureAttendanceFC602 = "#childArrangementOrders-secureAttendanceFC602",
  childArrangementOrdersFc603Order = "#childArrangementOrders-fc603Order",
  childArrangementOrdersCommittalWarrantFC604 = "#childArrangementOrders-committalWarrantFC604",
  powerOfArrest = "#domesticAbuseOrders-powerOfArrest",
  nonMolestation = "#domesticAbuseOrders-nonMolestationOrderFL401A",
  occupationOrder = "#domesticAbuseOrders-occupationOrder",
  consent_Yes = "#isTheOrderUploadedByConsent_Yes",
  consent_No = "#isTheOrderUploadedByConsent_No",
}

export class UploadDraftAnOrder3Page {
  public static async uploadDraftAnOrder3Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderFL401Options,
    uploadOrderC100Options,
    solicitorCaseCreateType,
  }: UploadDraftAnOrder3PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (solicitorCaseCreateType === "C100")
      await this.fillInCAFields({
        page,
        yesNoManageOrders,
        uploadOrderC100Options,
      });
    else {
      await this.fillInDAFields({
        page,
        yesNoManageOrders,
        uploadOrderFL401Options,
      });
    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<UploadDraftAnOrder3PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: UploadDraftAnOrder3Content.pageTitle,
      }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkGroup(
        page,
        39,
        UploadDraftAnOrder3Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.other}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInDAFields({
    page,
    yesNoManageOrders,
    uploadOrderFL401Options,
  }: Partial<UploadDraftAnOrder3PageOptions>): Promise<void> {
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

  private static async fillInCAFields({
    page,
    yesNoManageOrders,
    uploadOrderC100Options,
  }: Partial<UploadDraftAnOrder3PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (uploadOrderC100Options) {
      case "Blank order or directions (C21)":
        await page.click(
          UniqueSelectors.childArrangementOrdersBlankOrderOrDirections,
        );
        break;
      case "Child arrangements, specific issue or prohibited steps order (C43)":
        await page.click(
          UniqueSelectors.childArrangementOrdersCASpecificProhibitedOrder,
        );
        break;
      case "Parental responsibility order (C45A)":
        await page.click(
          UniqueSelectors.childArrangementOrdersParentalResponsibilityOrder,
        );
        break;
      case "Special guardianship order (C43A)":
        await page.click(
          UniqueSelectors.childArrangementOrdersSplGuardianshipOrder,
        );
        break;
      case "Declaration of parentage order (C63A)":
        await page.click(
          UniqueSelectors.childArrangementOrdersDeclarationOfParentageOrder,
        );
        break;
      case "Order to disclose information about whereabouts of a child (C30)":
        await page.click(UniqueSelectors.childArrangementOrdersDiscloseOrder);
        break;
      case "Authority for search, taking charge and delivery of a child (C31)":
        await page.click(UniqueSelectors.childArrangementOrdersAuthorityC31);
        break;
      case "Family assistance order (C42)":
        await page.click(
          UniqueSelectors.childArrangementOrdersFamilyAssistOrder,
        );
        break;
      case "Leave to change a child's surname or remove from the jurisdiction (C44)":
        await page.click(
          UniqueSelectors.childArrangementOrdersLeaveToChangeC44,
        );
        break;
      case "Appointment of a guardian (C47A)":
        await page.click(
          UniqueSelectors.childArrangementOrdersGuardianAppointmentC47A,
        );
        break;
      case "Appointment of a solicitor for the child (C48A)":
        await page.click(
          UniqueSelectors.childArrangementOrdersSolicitorAppointmentC48A,
        );
        break;
      case "Enforcement of a child arrangements order (C80)":
        await page.click(
          UniqueSelectors.childArrangementOrdersCAEnforcementC80,
        );
        break;
      case "Financial compensation order following C79 enforcement application (C82)":
        await page.click(
          UniqueSelectors.childArrangementOrdersFinancialCompensationC82,
        );
        break;
      case "Summons to appear at court for directions in contempt proceedings (FC601)":
        await page.click(UniqueSelectors.childArrangementOrdersSummonsFC601);
        break;
      case "Warrant to secure attendance at court (FC602)":
        await page.click(
          UniqueSelectors.childArrangementOrdersSecureAttendanceFC602,
        );
        break;
      case "Order on determination of proceedings for contempt of court (FC603)":
        await page.click(UniqueSelectors.childArrangementOrdersFc603Order);
        break;
      case "Warrant of committal (FC604)":
        await page.click(
          UniqueSelectors.childArrangementOrdersCommittalWarrantFC604,
        );
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
