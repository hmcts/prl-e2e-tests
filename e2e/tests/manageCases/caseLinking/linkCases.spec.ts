import { test } from "@playwright/test";
import Config from "../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";
import { LinkCases } from "../../../journeys/manageCases/caseLinking/linkCases.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Link DA cases as a court admin.", () => {
  let caseToBeLinked: string = "";

  test.beforeEach(async ({ page }) => {
    const ccdRef = await createDaCitizenCourtNavCase(true, true);
    caseToBeLinked = await createDaCitizenCourtNavCase(true, true);
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
