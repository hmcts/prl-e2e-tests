import { test } from "../../fixtures.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";
import { ManageCaseLinks } from "../../../journeys/manageCases/caseLinking/manageCaseLinks.ts";
import { LinkCases } from "../../../journeys/manageCases/caseLinking/linkCases.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Manage case links as a court admin.", () => {
  let linkedCase: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    const ccdRef = await caseEventUtils.createDACase(browser);
    linkedCase = await caseEventUtils.createDACase(browser);
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

  test("Manage case links @regression", async ({ page }): Promise<void> => {
    await ManageCaseLinks.manageCaseLinks({
      page: page,
      linkedCaseNumber: linkedCase,
      accessibilityTest: false,
    });
  });
});
