import { test } from "@playwright/test";
import Config from "../../../config";
import createDaCitizenCourtNavCase from "../../../common/caseHelpers/citizenDACaseCreateHelper";
import { Helpers } from "../../../common/helpers";
import config from "../../../config";
import { ManageCaseLinks } from "../../../journeys/manageCases/caseLinking/manageCaseLinks";
import { LinkCases } from "../../../journeys/manageCases/caseLinking/linkCases.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Manage case links as a court admin.", () => {
  let linkedCase: string = "";

  test.beforeEach(async ({ page }) => {
    const ccdRef = await createDaCitizenCourtNavCase(true, true);
    linkedCase = await createDaCitizenCourtNavCase(true, true);

    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await LinkCases.linkCases({
      page: page,
      linkedCaseNumber: linkedCase,
      accessibilityTest: false,
    });
  });

  test("Manage case links. With accessibility test. @nightly @accessibility", async ({
    page,
  }): Promise<void> => {
    await ManageCaseLinks.manageCaseLinks({
      page: page,
      linkedCaseNumber: linkedCase,
      accessibilityTest: true,
    });
  });

  test("Manage case links @regression", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(100000);
    await ManageCaseLinks.manageCaseLinks({
      page: page,
      linkedCaseNumber: linkedCase,
      accessibilityTest: false,
    });
  });
});
