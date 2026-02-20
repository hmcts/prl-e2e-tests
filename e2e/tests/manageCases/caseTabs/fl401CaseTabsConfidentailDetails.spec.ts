import config from "../../../utils/config.utils";
import { Helpers } from "../../../common/helpers";
import { test } from "../../fixtures";
import { ConfirmApplicantContactInstructions } from "../../../journeys/citizen/caseView/confirmContactDetails/confirmApplicantContactInstructions";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
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

  test("Applicant update contact details. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await ConfirmApplicantContactInstructions.confirmApplicantContactInstructions(
      {
        page,
        browser,
        caseRef: ccdRef,
        isApplicant: true,
        accessibilityTest: true,
        applicationSubmittedBy: "Citizen",
      },
    );
  });
});
