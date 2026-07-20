import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ListWithoutNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithoutNotice.ts";

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("List without notice tests for DA cases", () => {
  let caseRef: string;

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
      ccdRef: caseRef,
      caseType: "FL401",
      accessibilityTest: true,
    });
  });
});
