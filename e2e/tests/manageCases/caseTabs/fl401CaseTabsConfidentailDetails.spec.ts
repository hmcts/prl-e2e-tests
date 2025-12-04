
import config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ConfirmContactDetails } from "../../../journeys/citizen/caseView/confirmContactDetails/confirmContactDetails.ts";
import { FL401CaseTabs } from "../../../journeys/manageCases/caseTabs/fl401CaseTabs.ts";
import { test } from "../../fixtures.ts";
import { FL401ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabPage.ts";

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

test(
  "Applicant update contact details. @nightly @regression @tp",
  async ({ page, browser }): Promise<void> => {
    await ConfirmContactDetails.confirmContactDetails({
      page,
      browser,
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
    });

    await FL401CaseTabs.fl401CaseConfidentialTab({
      page,
      browser,
      courtIsListed: true,
      accessibilityTest: true,
      caseRef: ccdRef,
    }
    );
  });
});
