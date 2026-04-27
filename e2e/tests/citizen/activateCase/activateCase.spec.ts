import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { ActivateCitizenC100Case } from "../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests", (): void => {
  test("Activate case as an applicant. @regression", async ({
    page,
    citizenC100CaseUtils,
    idamLoginHelper,
    accessCodeHelper,
  }): Promise<void> => {
    await ActivateCitizenC100Case.activateCase({
      page: page,
      citizenC100CaseUtils: citizenC100CaseUtils,
      idamLoginHelper: idamLoginHelper,
      accessCodeHelper: accessCodeHelper,
      isApplicant: true,
    });
  });

  test("Activate case as an respondent. @regression", async ({
    page,
    citizenC100CaseUtils,
    idamLoginHelper,
    accessCodeHelper,
  }): Promise<void> => {
    await ActivateCitizenC100Case.activateCase({
      page: page,
      citizenC100CaseUtils: citizenC100CaseUtils,
      idamLoginHelper: idamLoginHelper,
      accessCodeHelper: accessCodeHelper,
      isApplicant: false,
    });
  });
});
