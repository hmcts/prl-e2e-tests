import { Page } from "@playwright/test";
import { DraftAnOrder1Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page.ts";
import { DraftAnOrder2Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder2Page.ts";
import {
  OrderType,
  solicitorCaseCreateType,
} from "../../../../../common/types.ts";
import { DraftAnOrder4Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder4Page.ts";
import { DraftAnOrder8Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder8Page.ts";
import { DraftAnOrder20Page } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder20Page.ts";
import { DraftAnOrderSubmitPage } from "../../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrderSubmitPage.ts";

interface ParentalResponsibilityOrderParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  yesNoToAll: boolean;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  checkPdf: boolean;
  caseRef: string;
  isUploadOrder: boolean;
}

export class ParentalResponsibilityOrder {
  public static async parentalResponsibilityOrder({
    page,
    caseType,
    orderType,
    yesNoToAll,
    errorMessaging,
    accessibilityTest,
    checkPdf,
    caseRef,
    isUploadOrder,
  }: ParentalResponsibilityOrderParams): Promise<void> {
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
    await DraftAnOrder8Page.draftAnOrder8Page(
      page,
      orderType,
      errorMessaging,
      accessibilityTest,
    );
    await DraftAnOrder20Page.draftAnOrder20Page(
      page,
      orderType,
      yesNoToAll,
      "noEndDate",
      accessibilityTest,
      checkPdf,
      caseRef,
    );
    await DraftAnOrderSubmitPage.draftAnOrderSubmitPage(
      page,
      orderType,
      yesNoToAll,
      "noEndDate",
      false,
      accessibilityTest,
    );
  }
}
