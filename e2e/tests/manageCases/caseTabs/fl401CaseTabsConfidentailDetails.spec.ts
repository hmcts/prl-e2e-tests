import config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { test } from "../../fixtures.ts";
import { ConfirmApplicantContactInstructions } from "../../../journeys/citizen/caseView/confirmContactDetails/confirmApplicantContactInstructions.ts";

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
