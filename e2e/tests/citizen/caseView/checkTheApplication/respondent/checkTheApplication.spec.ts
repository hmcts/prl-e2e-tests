import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent confirm contact details tests", (): void => {
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

  test("Respondent Check The Application. @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CheckTheApplication.checkTheApplication({
      page,
      isApplicant: false,
    });
  });
});
