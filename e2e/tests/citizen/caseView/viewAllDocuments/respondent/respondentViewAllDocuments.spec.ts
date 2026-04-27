import { test } from "../../../../fixtures.ts";
import Config from "../../../../../utils/config.utils.ts";
import { ViewAllDocuments } from "../../../../../journeys/citizen/caseView/viewAllDocuments/viewAllDocuments.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant view all documents tests", (): void => {
  test.beforeEach(
    async ({
      page,
      citizenC100CaseUtils,
      idamLoginHelper,
      accessCodeHelper,
    }) => {
      await ActivateCitizenC100Case.activateCase({
        page,
        citizenC100CaseUtils,
        idamLoginHelper,
        accessCodeHelper,
        isApplicant: false,
      });
    },
  );

  test("Applicant view all documents. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await ViewAllDocuments.viewAllDocuments({
      page: page,
      accessibilityTest: true,
      isApplicant: false,
    });
  });
});
