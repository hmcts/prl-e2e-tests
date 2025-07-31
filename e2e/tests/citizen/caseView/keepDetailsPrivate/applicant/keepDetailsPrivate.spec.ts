import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { KeepDetailsPrivate } from "../../../../../journeys/citizen/caseView/keepDetailsPrivate/applicant&Respondent/keepDetailsPrivate.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant keep details private tests", (): void => {
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

  test("Applicant keep details private with yes response. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: true,
      startAlternativeYesNo: true,
      yesNoDontKnow: "yes",
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Applicant keep details private with no response. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: true,
      startAlternativeYesNo: false,
      yesNoDontKnow: "no",
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Applicant keep details private with dontKnow response. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: true,
      startAlternativeYesNo: true,
      yesNoDontKnow: "dontKnow",
      applicationSubmittedBy: "Citizen",
    });
  });
});
