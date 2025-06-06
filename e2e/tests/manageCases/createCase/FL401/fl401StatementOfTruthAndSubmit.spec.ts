import { test } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils";
import { Fl401StatementOfTruth } from "../../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth.ts";
import { createTSSolicitorCase } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case Statement of Truth and Submit tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.manageCasesBaseURLCase);
    const ccdRef = await createTSSolicitorCase(page, "FL401");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Complete the FL401 Statement of Truth and Submit event as a solicitor with yes to everything. @accessibility @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      fl401YesNoToEverything: true,
      subJourney: false,
    });
  });

  test(`Complete the FL401 Statement of Truth and Submit event as a solicitor with no to everything. @regression`, async ({
    page,
  }): Promise<void> => {
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: false,
    });
  });
});
