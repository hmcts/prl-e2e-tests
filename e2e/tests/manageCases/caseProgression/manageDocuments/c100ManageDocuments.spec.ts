import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ManageDocuments } from "../../../../journeys/manageCases/caseProgression/manageDocuments/manageDocuments.ts";
import Config from "../../../../utils/config.utils.js";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Manage documents event for C100 case tests as a court admin.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test("Complete Manage Documents where the document is an 'Applicant's statements' and is uploaded on behalf of the applicant. Saying yes to Restrict Access and yes to confidential. With accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await ManageDocuments.manageDocuments({
      page: page,
      accessibilityTest: true,
      caseType: "C100",
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
      caseType: "C100",
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
      caseType: "C100",
      documentParty: "Local authority",
      documentCategory: "MIAM certificate/Exemption",
      restrictDocument: false,
      confidentialDocument: true,
    });
  });
});
