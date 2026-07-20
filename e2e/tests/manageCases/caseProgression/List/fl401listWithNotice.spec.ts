import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ListWithNotice } from "../../../../journeys/manageCases/caseProgression/List/listWithNotice.ts";

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("List with notice tests for DA cases", () => {
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

  test(`Complete list with notice event for DA cases. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ListWithNotice.listWithNotice({
      page: page,
      browser: browser,
      ccdRef: caseRef,
      caseType: "FL401",
      accessibilityTest: true,
    });
  });
});
