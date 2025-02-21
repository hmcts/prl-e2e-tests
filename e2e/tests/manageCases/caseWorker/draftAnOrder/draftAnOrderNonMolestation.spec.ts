import { test } from "@playwright/test";
import Config from "../../../../config";
import { DraftAnOrder } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { SolicitorDACaseCreator } from "../../../../common/solicitorDACaseCreator.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a non molestation order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page }) => {
    await page.goto(Config.manageCasesBaseURL);
    caseRef =
      await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(page);
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
  });

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
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseRef,
      checkPdf: true,
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
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseRef,
      checkPdf: true,
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
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: true,
      browser: browser,
      caseRef: caseRef,
      checkPdf: true,
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
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseRef,
      checkPdf: true,
    });
  });
});
