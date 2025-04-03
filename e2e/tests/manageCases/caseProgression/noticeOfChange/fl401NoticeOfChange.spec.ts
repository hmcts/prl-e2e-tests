import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Notice of Change tests for DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false); // creates a case without representation
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("NOC applicant. @nightly @accessibility @regression", async ({ page }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      caseType: "FL401",
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: true,
    });
  });

  test("NOC respondent. @regression", async ({ page }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      caseType: "FL401",
      caseRef: ccdRef,
      isApplicant: false,
      accessibilityTest: false,
    });
  });
});
