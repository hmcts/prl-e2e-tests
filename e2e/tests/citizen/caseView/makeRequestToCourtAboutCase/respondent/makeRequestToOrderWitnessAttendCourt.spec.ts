import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestToOrderWitnessToAttendCourt } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourt.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Make a request to order a witness to attend court tests", (): void => {
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
          accessibilityTest: false, // TODO create ticket for this accessibility failure
          isApplicant: false,
          alreadyCompletedFP25: true,
          haveSupportingDocumentsUpload: true,
          usingHwf: false,
          reasonForUrgency: true,
          applicationSubmittedBy: "Solicitor",
        },
      );
    },
  );
});
