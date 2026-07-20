import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { StatementOfService } from "../../../../journeys/manageCases/caseProgression/statementOfService/statementOfService.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Statement of Service event for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.serviceOfApplication(caseRef, "C100");
    await manageCasesEventUtils.confidentialityCheck(caseRef);
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test("Complete Task - statement of Service - with accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await StatementOfService.C100StatementOfService({
      page: page,
      accessibilityTest: true,
    });
  });
});
