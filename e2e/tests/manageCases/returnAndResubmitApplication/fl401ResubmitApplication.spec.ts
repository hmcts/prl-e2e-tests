import Config from "../../../utils/config.utils";
import { Helpers } from "../../../common/helpers";
import { ReturnApplication } from "../../../journeys/manageCases/caseWorker/returnApplication/returnApplication";
import { ResubmitApplication } from "../../../journeys/manageCases/resubmitApplication/resubmitApplication";
import { test } from "../../fixtures";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Resubmit returned DA(FL401) application tests", (): void => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await ReturnApplication.returnApplication({
      page: ctscPage,
      caseType: "FL401",
      accessibilityTest: false,
    });
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Resubmit returned DA(FL401) application with the following options:
  Case: FL401,
  Not accessibility testing.
  @regression`, async ({ page }): Promise<void> => {
    await ResubmitApplication.resubmitApplication({
      page: page,
      caseType: "FL401",
      accessibilityTest: false,
    });
  });

  test(`Resubmit returned DA(FL401) application with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await ResubmitApplication.resubmitApplication({
      page: page,
      caseType: "FL401",
      accessibilityTest: true,
    });
  });
});
