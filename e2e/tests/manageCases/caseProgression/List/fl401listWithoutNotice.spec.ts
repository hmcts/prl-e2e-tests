import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { ListWithoutNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithoutNotice";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("List without notice tests for DA cases", () => {
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

  test(`Complete list without notice event for DA Cases. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ListWithoutNotice.listWithoutNotice({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      caseType: "FL401",
      accessibilityTest: true,
    });
  });
});
