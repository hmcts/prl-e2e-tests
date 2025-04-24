import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ManageOrders24CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24CAContent";
import { uploadOrderC100Options } from "../../../../common/types";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { ManageOrders3DAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders3DAContent";

interface manageOrders3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options: uploadOrderC100Options;
}

enum UniqueSelectors {
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

export class ManageOrders3PageCA {
  public static async manageOrders3PageCA({
                                          page,
                                          accessibilityTest,
                                          yesNoManageOrders,
                                          uploadOrderC100Options,
                                        }: manageOrders3PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      uploadOrderC100Options,
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
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
                                      page,
                                      yesNoManageOrders,
                                      uploadOrderC100Options,
                                    }: Partial<manageOrders3PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (uploadOrderC100Options) {
      case "Blank order or directions (C21)":
        await page.click(UniqueSelectors.childArrangementOrdersBlankOrderOrDirections);
        break;
      case "Child arrangements, specific issue or prohibited steps order (C43)":
        await page.click(UniqueSelectors.childArrangementOrdersCASpecificProhibitedOrder);
        break;
      case "Parental responsibility order (C45A)":
        await page.click(UniqueSelectors.childArrangementOrdersParentalResponsibilityOrder);
        break;
      case "Special guardianship order (C43A)":
        await page.click(UniqueSelectors.childArrangementOrdersSplGuardianshipOrder);
        break;
      case "Declaration of parentage order (C63A)":
        await page.click(UniqueSelectors.childArrangementOrdersDeclarationOfParentageOrder);
        break;
      case "Order to disclose information about whereabouts of a child (C30)":
        await page.click(UniqueSelectors.childArrangementOrdersDiscloseOrder);
        break;
      case "Authority for search, taking charge and delivery of a child (C31)":
        await page.click(UniqueSelectors.childArrangementOrdersAuthorityC31);
        break;
      case "Family assistance order (C42)":
        await page.click(UniqueSelectors.childArrangementOrdersFamilyAssistOrder);
        break;
      case "Leave to change a child's surname or remove from the jurisdiction (C44)":
        await page.click(UniqueSelectors.childArrangementOrdersLeaveToChangeC44);
        break;
      case "Appointment of a guardian (C47A)":
        await page.click(UniqueSelectors.childArrangementOrdersGuardianAppointmentC47A);
        break;
      case "Appointment of a solicitor for the child (C48A)":
        await page.click(UniqueSelectors.childArrangementOrdersSolicitorAppointmentC48A);
        break;
      case "Enforcement of a child arrangements order (C80)":
        await page.click(UniqueSelectors.childArrangementOrdersCAEnforcementC80);
        break;
      case "Financial compensation order following C79 enforcement application (C82)":
        await page.click(UniqueSelectors.childArrangementOrdersFinancialCompensationC82);
        break;
      case "Summons to appear at court for directions in contempt proceedings (FC601)":
        await page.click(UniqueSelectors.childArrangementOrdersSummonsFC601);
        break;
      case "Warrant to secure attendance at court (FC602)":
        await page.click(UniqueSelectors.childArrangementOrdersSecureAttendanceFC602);
        break;
      case "Order on determination of proceedings for contempt of court (FC603)":
        await page.click(UniqueSelectors.childArrangementOrdersFc603Order);
        break;
      case "Warrant of committal (FC604)":
        await page.click(UniqueSelectors.childArrangementOrdersCommittalWarrantFC604);
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
