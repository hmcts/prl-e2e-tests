import { test } from "../../fixtures.ts";
import { ActivateCase } from "../../../journeys/citizen/activateCase/activateCase.ts";
import config from "../../../utils/config.utils.ts";
import { CreateUserUtil } from "../../../utils/createUser.utils.js";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(
    async ({
      page,
      browser,
      citizenCACaseUtils,
      caseEventUtils,
      navigationUtils,
    }) => {
      const applicantUserInfo = await CreateUserUtil.createUser(
        process.env.CREATE_USER_BEARER_TOKEN as string,
        "citizen",
      );
      ccdRef = await citizenCACaseUtils.createAndSubmitCase(applicantUserInfo);
      await caseEventUtils.caCaseIssueToLocalCourtAndSendToGatekeeper(
        ccdRef,
        browser,
      );
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
      );
    },
  );

  test("Activate case as an applicant and respondent. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseUser: "both",
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
      isManualSOA: true,
    });
  });
});
