import { DummyPaymentAwp } from "./dummyPaymentAwp";
import { Page } from "@playwright/test";
import { OrderType, solicitorCaseCreateType } from "../../../common/types";
import { Helpers } from "../../../common/helpers";
import { DraftAnOrder1Page } from "../../../pages/manageCases/caseWorker/draftAnOrder1Page";
import { DraftAnOrder2Page } from "../../../pages/manageCases/caseWorker/draftAnOrder2Page";
import { DraftAnOrder4Page } from "../../../pages/manageCases/caseWorker/draftAnOrder4Page";
import { DraftAnOrder5Page } from "../../../pages/manageCases/caseWorker/draftAnOrder5Page";
import { DraftAnOrder16Page } from "../../../pages/manageCases/caseWorker/draftAnOrder16Page";
import { DraftAnOrder20Page } from "../../../pages/manageCases/caseWorker/draftAnOrder20Page";

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
  }: DraftAnOrderParams): Promise<void> {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging,
      accessibilityTest,
      paymentStatusPaid,
      caseType,
    });
    await Helpers.chooseEventFromDropdown(page, "Draft an order");
    await DraftAnOrder1Page.draftAnOrder1Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder2Page.draftAnOrder2Page(
      page,
      caseType,
      orderType,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder4Page.draftAnOrder4Page(
      page,
      caseType,
      orderType,
      yesNoToAll,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder5Page.draftAnOrder5Page(
      page,
      orderType,
      yesNoToAll,
      howLongWillOrderBeInForce,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder16Page.draftAnOrder16Page(
      page,
      orderType,
      yesNoToAll,
      willAllPartiesAttendHearing,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder20Page.draftAnOrder20Page(
      page,
      orderType,
      yesNoToAll,
      howLongWillOrderBeInForce,
      willAllPartiesAttendHearing,
      accessibilityTest,
    );
  }
}
