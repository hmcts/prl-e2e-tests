import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import { DraftAnOrder } from "../../../../../journeys/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a non molestation order tests", (): void => {
  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  No to all options,
  No respondent checkbox actions ticked,
  Order in force until no fixed end date,
  Not accessibility testing,
  Not error message testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  No to all options,
  No respondent checkbox actions ticked,
  Order in force until specific date and time,
  Not accessibility testing,
  Not error message testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  Yes to all options,
  All respondent checkbox actions ticked,
  Order in force until no fixed end date,
  Not Accessibility testing,
  Not error message testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  Yes to all options,
  All respondent checkbox actions ticked,
  Order in force until specific date and time,
  Not Accessibility testing,
  Not error message testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: true,
      browser: browser,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  No to all options,
  No respondent checkbox actions ticked,
  Order in force until no fixed end date,
  Accessibility testing,
  Not error message testing. @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: true,
      paymentStatusPaid: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
    });
  });
});
