import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourt.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Make a request to order a witness to attend court tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(
    "Respondent Make a request to order a witness to attend court page." +
      "No Help With Fees." +
      "Already Completed FP25 @regression @accessibility @nightly",
    async ({ page, browser }): Promise<void> => {
      await RequestToOrderWitnessToAttendCourt.requestToOrderWitnessToAttendCourt(
        {
          page: page,
          browser: browser,
          caseRef: ccdRef,
          accessibilityTest: false,
          isApplicant: false,
          alreadyCompletedFP25: true,
          haveSupportingDocumentsUpload: true,
          usingHwf: false,
          reasonForUrgency: true,
          applicationSubmittedBy: "Citizen",
        },
      );
    },
  );
});
