import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ListWithoutNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithoutNotice.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("List without notice tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(false, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Complete list without notice event. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ListWithoutNotice.listWithoutNotice({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
    });
  });
});
