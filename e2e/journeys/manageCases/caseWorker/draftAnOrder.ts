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

export const orderTypesMap: Map<OrderType, string> = new Map([
  [
    "c21ApplicationRefused",
    "Blank order or directions (C21): application refused",
  ],
  [
    "c21WithdrawApplication",
    "Blank order or directions (C21): to withdraw application",
  ],
  ["c21NoOrderMade", "Blank order or directions (C21): no order made"],
  ["c21other", "Blank order or directions (C21): Other"],
  [
    "childArrangementsSpecificProhibitedOrder",
    "Child arrangements, specific issue or prohibited steps order (C43)",
  ],
  ["parentalResponsibility", "Parental responsibility order (C45A)"],
  ["specialGuardianShip", "Special guardianship order (C43A)"],
  ["appointmentOfGuardian", "Appointment of a guardian (C47A)"],
  ["nonMolestation", "Non-molestation order (FL404A)"],
  ["occupation", "Occupation order (FL404)"],
  ["powerOfArrest", "Power of arrest (FL406)"],
  ["amendDischargedVaried", "Amended, discharged or varied order (FL404B)"],
  ["blank", "Blank order (FL404B)"],
  ["generalForm", "General form of undertaking (N117)"],
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
