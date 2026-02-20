import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { KeepDetailsPrivate } from "../../../../../journeys/citizen/caseView/keepDetailsPrivate/applicant&Respondent/keepDetailsPrivate";

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

  test("Respondent keep details private with yes response. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: false,
      startAlternativeYesNo: true,
      yesNoDontKnow: "yes",
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Respondent keep details private with no response. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: false,
      startAlternativeYesNo: false,
      yesNoDontKnow: "no",
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Respondent keep details private with dontKnow response. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: false,
      startAlternativeYesNo: true,
      yesNoDontKnow: "dontKnow",
      applicationSubmittedBy: "Citizen",
    });
  });
});
