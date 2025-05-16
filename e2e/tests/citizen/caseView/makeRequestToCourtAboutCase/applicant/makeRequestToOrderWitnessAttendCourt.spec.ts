import { test } from "@playwright/test";
import Config from "../../../../../utils/config.ts";
import config from "../../../../../utils/config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessToAttendCourt.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to order a witness to attend court tests", (): void => {
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

  test("Applicant Make a request to order a witness to attend court page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RequestToOrderWitnessToAttendCourt.requestToOrderWitnessToAttendCourt(
      {
        page: page,
        browser: browser,
        caseRef: ccdRef,
        accessibilityTest: false,
        isApplicant: true,
        alreadyCompletedFP25: true,
        haveSupportingDocumentsUpload: true,
        reasonForUrgency: true,
        applicationSubmittedBy: "Citizen",
      },
    );
  });
});
