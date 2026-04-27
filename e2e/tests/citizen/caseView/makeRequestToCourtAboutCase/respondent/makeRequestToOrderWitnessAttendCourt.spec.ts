import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourt.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Make a request to order a witness to attend court tests", (): void => {
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

  test(
    "Respondent Make a request to order a witness to attend court page." +
      "No Help With Fees." +
      "Already Completed FP25 @regression @accessibility @nightly",
    async ({ page }): Promise<void> => {
      await RequestToOrderWitnessToAttendCourt.requestToOrderWitnessToAttendCourt(
        {
          page: page,
          accessibilityTest: false,
          alreadyCompletedFP25: true,
          haveSupportingDocumentsUpload: true,
          helpWithFees: false,
          reasonForUrgency: true,
        },
      );
    },
  );
});
