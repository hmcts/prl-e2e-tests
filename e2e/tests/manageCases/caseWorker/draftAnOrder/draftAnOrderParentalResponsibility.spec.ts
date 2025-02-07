import { test } from "@playwright/test";
import Config from "../../../../config";
import { DraftAnOrder } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests", (): void => {
  // Triple timeout for these slow tests
  test.slow();

  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  No to all options,
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
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
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
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
  Accessibility testing. @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: true,
      caseType: "C100",
      orderType: "parentalResponsibility",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });
});
