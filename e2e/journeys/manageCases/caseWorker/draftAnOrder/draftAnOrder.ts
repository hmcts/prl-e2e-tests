import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { OrderType, solicitorCaseCreateType } from "../../../../common/types";
import config from "../../../../config";
import { IssueAndSendToLocalCourtCallback1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallback1Page";
import { IssueAndSendToLocalCourtCallbackSubmitPage } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallbackSubmitPage";
import { DummyPaymentAwp } from "../dummyPayment/dummyPaymentAwp";
import { NonMolestationOrder } from "./nonMolestationOrder/nonMolestationOrder";
import { ParentalResponsibilityOrder } from "./ParentalResponsibilityOrder/parentalResponsibilityOrder";

interface DraftAnOrderParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  yesNoToAll: boolean;
  howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce;
  willAllPartiesAttendHearing: boolean;
  browser: Browser;
}

export type HowLongWillTheOrderBeInForce =
  | "noEndDate"
  | "untilNextHearing"
  | "specifiedDateAndTime";

interface OrderTypeStrings {
  journeyName: string;
  englishPdfName: string;
  welshPdfName: string;
}

export const orderTypesMap: Map<OrderType, OrderTypeStrings> = new Map([
  [
    "c21ApplicationRefused",
    {
      journeyName: "Blank order or directions (C21): application refused",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "c21WithdrawApplication",
    {
      journeyName: "Blank order or directions (C21): to withdraw application",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "c21NoOrderMade",
    {
      journeyName: "Blank order or directions (C21): no order made",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "c21other",
    {
      journeyName: "Blank order or directions (C21): Other",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "childArrangementsSpecificProhibitedOrder",
    {
      journeyName:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "parentalResponsibility",
    {
      journeyName: "Parental responsibility order (C45A)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "specialGuardianShip",
    {
      journeyName: "Special guardianship order (C43A)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "appointmentOfGuardian",
    {
      journeyName: "Appointment of a guardian (C47A)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "nonMolestation",
    {
      journeyName: "Non-molestation order (FL404A)",
      englishPdfName: "Non-molestation order",
      welshPdfName: "Gorchymyn rhag molestu",
    },
  ],
  [
    "occupation",
    {
      journeyName: "Occupation order (FL404)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "powerOfArrest",
    {
      journeyName: "Power of arrest (FL406)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "amendDischargedVaried",
    {
      journeyName: "Amended, discharged or varied order (FL404B)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "blank",
    {
      journeyName: "Blank order (FL404B)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
  [
    "generalForm",
    {
      journeyName: "General form of undertaking (N117)",
      englishPdfName: "",
      welshPdfName: "",
    },
  ],
]);

const caseNumberSelector: string = ".case-title h2:nth-child(3)";

export class DraftAnOrder {
  public static async draftAnOrder({
    page,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
    caseType,
    orderType,
    yesNoToAll,
    howLongWillOrderBeInForce,
    willAllPartiesAttendHearing,
    browser,
  }: DraftAnOrderParams): Promise<string> {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging,
      accessibilityTest,
      paymentStatusPaid,
      caseType,
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
    });
    // fetch the case ref to be used when editing and approving an order
    const unformattedCaseRef: string | null = await page
      .locator(caseNumberSelector)
      .textContent();
    const formattedCaseRef: string | undefined = unformattedCaseRef?.slice(12);
    if (caseType === "C100") {
      // C100 orders are assigned to Central Family Court by default
      // need to assign the case to Swansea court if we want to allow a Swansea judge to edit & approve the order
      await this.assignCaseToSwanseaCourt(
        browser,
        formattedCaseRef!,
        accessibilityTest,
      );
    }
    await Helpers.chooseEventFromDropdown(page, "Draft an order");
    switch (orderType) {
      case "nonMolestation":
        await NonMolestationOrder.nonMolestationOrder({
          page,
          errorMessaging,
          accessibilityTest,
          caseType,
          orderType,
          yesNoToAll,
          howLongWillOrderBeInForce,
          willAllPartiesAttendHearing,
        });
        break;
      case "parentalResponsibility":
        await ParentalResponsibilityOrder.parentalResponsibilityOrder({
          page,
          caseType,
          orderType,
          yesNoToAll,
          errorMessaging,
          accessibilityTest,
        });
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
    return formattedCaseRef ? formattedCaseRef : "";
  }

  private static async assignCaseToSwanseaCourt(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Issue and send to local Court",
    );
    await IssueAndSendToLocalCourtCallback1Page.issueAndSendToLocalCourtCallback1Page(
      page,
    );
    await IssueAndSendToLocalCourtCallbackSubmitPage.issueAndSendToLocalCourtCallbackSubmitPage(
      page,
      accessibilityTest,
    );
  }
}
