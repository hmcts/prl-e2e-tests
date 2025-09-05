import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

    test("Solicitor adds and removes Barrister. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "C100",
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: true,
    });
    });
        
    test("Caseworker adds and removes Barrister. @nightly @accessibility @regression", async ({
        page,
        browser,
    }): Promise<void> => {
        await NoticeOfChange.noticeOfChange({
            page: page,
            browser: browser,
            caseType: "C100",
            caseRef: ccdRef,
            isApplicant: true,
            accessibilityTest: true,
        });
    });

    // Repeat above scenarios for a Citizen created case
});