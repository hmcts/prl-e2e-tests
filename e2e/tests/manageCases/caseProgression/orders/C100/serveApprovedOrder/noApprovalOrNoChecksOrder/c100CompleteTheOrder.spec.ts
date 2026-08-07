import Config from "../../../../../../../utils/config.utils.ts";
import { test } from "../../../../../../fixtures.ts";
import { CompleteTheOrder } from "../../../../../../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for C100 case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await navigationUtils.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test(`Complete Creating and serving C100 order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility @regression`, async ({ page }): Promise<void> => {
    await CompleteTheOrder.C100completeTheOrder({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
      personallyServed: true,
      caseNumber: caseRef,
      errorMessaging: true,
    });
  });
});
