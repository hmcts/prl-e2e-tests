import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { OrderType, solicitorCaseCreateType } from "../../../../common/types";
import config from "../../../../config";
import { IssueAndSendToLocalCourtCallback1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallback1Page";
import { IssueAndSendToLocalCourtCallbackSubmitPage } from "../../../../pages/manageCases/caseWorker/draftAnOrder/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallbackSubmitPage";
import { NonMolestationOrder } from "./nonMolestationOrder/nonMolestationOrder";
import { ParentalResponsibilityOrder } from "./ParentalResponsibilityOrder/parentalResponsibilityOrder";

interface DraftAnOrderParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  yesNoToAll: boolean;
  howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce;
  willAllPartiesAttendHearing: boolean;
  browser: Browser;
  caseRef: string;
  checkPdf: boolean;
}

export type HowLongWillTheOrderBeInForce =
  | "noEndDate"
  | "untilNextHearing"
  | "specifiedDateAndTime";

export const orderTypesMap: Map<OrderType, string> = new Map([
  ["parentalResponsibility", "Parental responsibility order (C45A)"],
  ["nonMolestation", "Non-molestation order (FL404A)"],
  ["powerOfArrest", "Power of arrest (FL406)"],
  ["amendDischargedVaried", "Amended, discharged or varied order (FL404B)"],
]);

export class DraftAnOrder {
  public static async draftAnOrder({
    page,
    errorMessaging,
    accessibilityTest,
    caseType,
    orderType,
    yesNoToAll,
    howLongWillOrderBeInForce,
    willAllPartiesAttendHearing,
    browser,
    caseRef,
    checkPdf,
  }: DraftAnOrderParams): Promise<void> {
    if (caseType === "C100") {
      // C100 orders are assigned to Central Family Court by default
      // need to assign the case to Swansea court if we want to allow a Swansea judge to edit & approve the order
      await this.assignCaseToSwanseaCourt(browser, caseRef, accessibilityTest);
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
          checkPdf,
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
          checkPdf,
        });
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
    //check added to wait to case page to load
    await page.waitForLoadState("domcontentloaded");
    await page.waitForSelector("#next-step", { state: "visible" });
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
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
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
