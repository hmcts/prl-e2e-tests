import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { MakeRequestToCourtAboutCase } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/makeRequestToCourtAboutCase.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to the court about your case tests", (): void => {
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

  test("Applicant Make a request to the court about your case page. @regression @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await MakeRequestToCourtAboutCase.makeRequestToCourtAboutCase({
      page: page,
      accessibilityTest: true,
    });
  });
});
