import { DraftAnOrder1Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page.ts";
import { DraftAnOrder2Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder2Page.ts";
import { DraftAnOrder4Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder4Page.ts";
import { DraftAnOrder5Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder5Page.ts";
import { DraftAnOrder16Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder16Page.ts";
import { DraftAnOrder20Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder20Page.ts";
import { Page } from "@playwright/test";
import {
  OrderType,
  solicitorCaseCreateType,
} from "../../../../../common/types.ts";
import { HowLongWillTheOrderBeInForce } from "../draftAnOrder.ts";
import { DraftAnOrderSubmitPage } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrderSubmitPage.ts";

interface NonMolestationOrderParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  yesNoToAll: boolean;
  howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce;
  willAllPartiesAttendHearing: boolean;
  checkPdf: boolean;
  caseRef: string;
  isUploadOrder: boolean;
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
    caseRef,
    isUploadOrder,
  }: NonMolestationOrderParams): Promise<void> {
    await DraftAnOrder1Page.draftAnOrder1Page(
      page,
      errorMessaging,
      accessibilityTest,
      isUploadOrder,
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
      accessibilityTest,
      checkPdf,
      caseRef,
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
