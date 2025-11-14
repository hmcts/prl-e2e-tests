import Config from "../../../../../utils/config.utils.ts";
import { DraftAnOrder } from "../../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../utils/config.utils.ts";
import { test } from "../../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createCACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  No to all options,
  Not accessibility testing. @regression @visual`, async ({
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
      caseRef: caseRef,
      checkPdf: true,
      isUploadOrder: false,
    });
  });

  test(`Complete Drafting a parental responsibility as a solicitor with the following options:
  Yes to all options,
  Accessibility testing. @accessibility @nightly @regression @visual`, async ({
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
      caseRef: caseRef,
      checkPdf: true,
      isUploadOrder: false,
    });
  });
});
