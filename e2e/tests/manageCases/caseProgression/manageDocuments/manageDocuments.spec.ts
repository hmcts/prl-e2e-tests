import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { ManageDocuments } from "../../../../journeys/manageCases/caseProgression/manageDocuments/manageDocuments";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Manage documents event for DA Citizen case tests as a court admin.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Manage Documents where the document is an 'Applicant's statements' and is uploaded on behalf of the applicant. Saying yes to Restrict Access and yes to confidential. With accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await ManageDocuments.manageDocuments({
      page: page,
      accessibilityTest: true,
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
      documentParty: "Local authority",
      documentCategory: "MIAM certificate/Exemption",
      restrictDocument: false,
      confidentialDocument: true,
    });
  });
});
