import { Page, Browser } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { RemoveDraftOrder1Page } from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrder1Page.ts";
import { RemoveDraftOrder2Page } from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrder2Page.ts";
import { RemoveDraftOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrderSubmitPage.ts";
import { submitEvent } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";
import config from "../../../../config.ts";
import { DraftAnOrder } from "../../caseWorker/draftAnOrder/draftAnOrder.ts";

interface RemoveDraftOrderParams {
  page: Page;
  accessibilityTest: boolean;
  caseRef: string;
  browser: Browser;
}

export class RemoveDraftOrder {
  public static async removeDraftOrder({
    page,
    accessibilityTest,
    caseRef,
    browser,
  }: RemoveDraftOrderParams): Promise<void> {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      caseRef: caseRef,
      checkPdf: false,
      browser: browser,
    });
    const caseWorkerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caseWorkerPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await submitEvent(caseWorkerPage, caseRef, "fl401AddCaseNumber");
    await Helpers.goToCase(
      caseWorkerPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(caseWorkerPage, "Remove draft order");
    await RemoveDraftOrder1Page.removeDraftOrder1Page({
      caseWorkerPage,
      accessibilityTest,
    });
    await RemoveDraftOrder2Page.removeDraftOrder2Page({
      caseWorkerPage,
      accessibilityTest,
    });
    await RemoveDraftOrderSubmitPage.removeDraftOrderSubmitPage({
      caseWorkerPage,
      accessibilityTest,
    });
  }
}
