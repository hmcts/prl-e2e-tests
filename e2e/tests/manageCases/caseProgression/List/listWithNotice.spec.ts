import { test } from "@playwright/test";
import Config from "../../../../config";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { ListWithNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithNotice";
import createDaCitizenCourtNavCase from "../../../../common/createDACourtNavCaseHelper";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("List with notice tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete list with notice event. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ListWithNotice.listWithNotice({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
    });
  });
});
