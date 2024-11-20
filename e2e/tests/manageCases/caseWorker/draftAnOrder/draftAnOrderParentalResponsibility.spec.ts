import { test } from "@playwright/test";
import Config from "../../../../config";
import { DraftAnOrder } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests @manageCases", (): void => {
  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  No to all options,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "C100",
      orderType: "parentalResponsibility",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });

  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  Yes to all options,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "C100",
      orderType: "parentalResponsibility",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });

  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  No to all options,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: true,
      paymentStatusPaid: true,
      caseType: "C100",
      orderType: "parentalResponsibility",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });
});
