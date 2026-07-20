import Config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ReturnApplication } from "../../../journeys/manageCases/caseWorker/returnApplication/returnApplication.ts";
import { ResubmitApplication } from "../../../journeys/manageCases/resubmitApplication/resubmitApplication.ts";
import { test } from "../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Resubmit returned CA(C100) application tests", (): void => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ page, browser, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      const ctscPage = await Helpers.openNewBrowserWindow(
        browser,
        "courtAdminStoke",
      );
      await navigationUtils.goToCase(
        ctscPage,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
      await ReturnApplication.returnApplication({
        page: ctscPage,
        caseType: "C100",
        accessibilityTest: false,
      });
      await navigationUtils.goToCase(
        page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

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
