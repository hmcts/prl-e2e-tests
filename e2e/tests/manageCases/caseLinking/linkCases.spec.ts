import { test } from "../../fixtures.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";
import { LinkCases } from "../../../journeys/manageCases/caseLinking/linkCases.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Link DA cases as a court admin.", () => {
  let caseToBeLinked: string = "";

  test.beforeEach(async ({ page, courtNavUtils }) => {
    const ccdRef = await courtNavUtils.createCase(true, true);
    caseToBeLinked = await courtNavUtils.createCase(true, true);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Link cases. With accessibility test. @nightly @accessibility", async ({
    page,
  }): Promise<void> => {
    await LinkCases.linkCases({
      page: page,
      linkedCaseNumber: caseToBeLinked,
      accessibilityTest: true,
    });
  });

  test("Link cases @regression", async ({ page }): Promise<void> => {
    await LinkCases.linkCases({
      page: page,
      linkedCaseNumber: caseToBeLinked,
      accessibilityTest: false,
    });
  });
});
