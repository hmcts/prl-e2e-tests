import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessToAttendCourt";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to order a witness to attend court tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
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
