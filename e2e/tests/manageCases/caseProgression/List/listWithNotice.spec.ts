import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ListWithNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithNotice.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("List with notice tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
