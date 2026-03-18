import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestMoreTime } from "../../../../../journeys/citizen/caseView/requestMoreTime/applicant/requestMoreTime.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Request more time to do what is required by a court order tests", (): void => {
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

  test("Applicant Request more time without fees. @regression @nightly", async ({
    page,
  }): Promise<void> => {
    await RequestMoreTime.requestMoreTime({
      page: page,
      accessibilityTest: false,
      completedForm: true,
      agreementForRequest: true,
      supportingDocuments: true,
      reasonUrgentRequest: true,
      helpWithFees: true,
      hasHelpWithFeesRefNumber: true,
    });
  });
});
