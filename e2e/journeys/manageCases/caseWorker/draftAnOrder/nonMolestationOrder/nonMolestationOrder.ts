import { DraftAnOrder1Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page";
import { DraftAnOrder2Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder2Page";
import { DraftAnOrder4Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder4Page";
import { DraftAnOrder5Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder5Page";
import { DraftAnOrder16Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder16Page";
import { DraftAnOrder20Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder20Page";
import { Page } from "@playwright/test";
import {
  OrderType,
  solicitorCaseCreateType,
} from "../../../../../common/types";
import { HowLongWillTheOrderBeInForce } from "../draftAnOrder";
import { DraftAnOrderSubmitPage } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrderSubmitPage";

interface NonMolestationOrderParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  yesNoToAll: boolean;
  howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce;
  willAllPartiesAttendHearing: boolean;
  checkPdf: boolean,
}

export class NonMolestationOrder {
  public static async nonMolestationOrder({
    page,
    errorMessaging,
    accessibilityTest,
    caseType,
    orderType,
    yesNoToAll,
    howLongWillOrderBeInForce,
    willAllPartiesAttendHearing,
    checkPdf,
  }: NonMolestationOrderParams): Promise<void> {
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
      checkPdf,
    );
    await DraftAnOrderSubmitPage.draftAnOrderSubmitPage(
      page,
      orderType,
      yesNoToAll,
      howLongWillOrderBeInForce,
      willAllPartiesAttendHearing,
      accessibilityTest,
    );
  }
}
