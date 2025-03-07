import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import { ListWithoutNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithoutNotice";

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
