import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { UploadDocumentsWitnessStatement } from "../../../../../journeys/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/respondent/uploadDocumentsWitnessStatement.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents position statement tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({
      page,
      citizenC100CaseUtils,
      idamLoginHelper,
      accessCodeHelper,
    }) => {
      caseRef = await ActivateCitizenC100Case.activateCase({
        page,
        citizenC100CaseUtils,
        idamLoginHelper,
        accessCodeHelper,
        isApplicant: false,
      });
    },
  );

  test("Applicant upload documents position statement page. @regression @accessibility @nightly", async ({
    page,
    citizenC100CaseUtils,
  }): Promise<void> => {
    await UploadDocumentsWitnessStatement.uploadDocumentsWitnessStatement({
      page: page,
      accessibilityTest: true,
      yesNoNA: "Yes",
      citizenC100CaseUtils,
      caseRef,
    });
  });
});
