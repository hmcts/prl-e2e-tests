import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
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
        isApplicant: true,
      });
    },
  );

  test("Applicant Check The Application. @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CheckTheApplication.checkTheApplication({
      page,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
