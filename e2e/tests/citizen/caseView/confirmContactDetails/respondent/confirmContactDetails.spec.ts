import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { ConfirmContactDetails } from "../../../../../journeys/citizen/caseView/confirmContactDetails/confirmContactDetails.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent confirm contact details tests", (): void => {
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
      );
    },
  );

  test("Respondent confirm contact details. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ConfirmContactDetails.confirmContactDetails({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      isApplicant: false,
      accessibilityTest: true,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
