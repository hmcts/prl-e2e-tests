import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/requestToOrderWitnessToAttendCourt.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to order a witness to attend court tests", (): void => {
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
    },
  );

  test("Applicant Make a request to order a witness to attend court page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RequestToOrderWitnessToAttendCourt.requestToOrderWitnessToAttendCourt(
      {
        page: page,
        browser: browser,
        caseRef: ccdRef,
        accessibilityTest: true,
        isApplicant: true,
        alreadyCompletedFP25: true,
        haveSupportingDocumentsUpload: true,
        reasonForUrgency: true,
        applicationSubmittedBy: "Solicitor",
      },
    );
  });
});
