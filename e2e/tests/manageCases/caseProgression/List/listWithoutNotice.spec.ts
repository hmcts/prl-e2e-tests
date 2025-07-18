import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ListWithoutNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithoutNotice.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("List without notice tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(false, false);
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
