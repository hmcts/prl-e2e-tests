import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { ListWithNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithNotice";
import Config from "../../../../utils/config.utils.js";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("List with notice tests for CA cases", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test(`Complete list with notice event for CA cases. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ListWithNotice.listWithNotice({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      caseType: "C100",
      accessibilityTest: true,
    });
  });
});
