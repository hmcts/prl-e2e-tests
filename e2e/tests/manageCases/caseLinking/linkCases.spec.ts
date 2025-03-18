import { test } from "@playwright/test";
import Config from "../../../config";
import createDaCitizenCourtNavCase from "../../../common/caseHelpers/citizenDACaseCreateHelper";
import { Helpers } from "../../../common/helpers";
import config from "../../../config";
import { LinkCases } from "../../../journeys/manageCases/caseLinking/linkCases";

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
    test.setTimeout(100000);
    await LinkCases.linkCases({
      page: page,
      linkedCaseNumber: caseToBeLinked,
      accessibilityTest: true,
    });
  });

  test("Link cases @regression", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(100000);
    await LinkCases.linkCases({
      page: page,
      linkedCaseNumber: caseToBeLinked,
      accessibilityTest: false,
    });
  });
});
