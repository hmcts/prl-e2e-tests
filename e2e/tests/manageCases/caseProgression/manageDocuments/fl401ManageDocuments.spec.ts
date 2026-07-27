import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { ManageDocuments } from "../../../../journeys/manageCases/caseProgression/manageDocuments/manageDocuments.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Manage documents event for DA Solicitor case tests as a court admin.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test("Complete Manage Documents where the document is an 'Applicant's statements' and is uploaded on behalf of the applicant. Saying yes to Restrict Access and yes to confidential. With accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await ManageDocuments.manageDocuments({
      page: page,
      accessibilityTest: true,
      caseType: "FL401",
      documentParty: "Applicant",
      documentCategory: "Position statements",
      restrictDocument: true,
      confidentialDocument: true,
    });
  });

  test("Complete Manage Documents where the document is an 'Guardian report' and is uploaded on behalf of the respondent. No restricted access and not confidential. @regression", async ({
    page,
  }): Promise<void> => {
    await ManageDocuments.manageDocuments({
      page: page,
      accessibilityTest: true,
      caseType: "FL401",
      documentParty: "Respondent",
      documentCategory: "Guardian report",
      restrictDocument: false,
      confidentialDocument: false,
    });
  });

  test("Complete Manage Documents where the document is an 'MIAM certificate/Exemption' and is uploaded on behalf of the Local authority. Saying no to Restrict Access and yes to confidential. @regression", async ({
    page,
  }): Promise<void> => {
    await ManageDocuments.manageDocuments({
      page: page,
      accessibilityTest: false,
      caseType: "FL401",
      documentParty: "Local authority",
      documentCategory: "MIAM certificate/Exemption",
      restrictDocument: false,
      confidentialDocument: true,
    });
  });
});
