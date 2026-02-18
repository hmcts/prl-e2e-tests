import Config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ReturnApplication } from "../../../journeys/manageCases/caseWorker/returnApplication/returnApplication.ts";
import { ResubmitApplication } from "../../../journeys/manageCases/resubmitApplication/resubmitApplication.ts";
import { test } from "../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Resubmit returned CA(C100) application tests", (): void => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACase(browser);
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
      caseType: "C100",
      accessibilityTest: false,
    });
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test.fixme(`Resubmit returned CA(C100) application with the following options:
  Case: C100,
  Not accessibility testing.
  @regression`, async ({ page }): Promise<void> => {
    await ResubmitApplication.resubmitApplication({
      page: page,
      caseType: "C100",
      accessibilityTest: false,
    });
  });

  test.fixme(`Resubmit returned CA(C100) application with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await ResubmitApplication.resubmitApplication({
      page: page,
      caseType: "C100",
      accessibilityTest: true,
    });
  });
});
