import Config from "../../../../utils/config.utils";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers.js";
import { test } from "../../../fixtures";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Delete CA(C100) application tests in draft state", (): void => {
  test.beforeEach(async ({ page, caseEventUtils }) => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef: string = await caseEventUtils.createTSSolicitorCase(
      page,
      "C100",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Delete C100 drafted case as a solicitor with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await DeleteApplication.deleteApplication({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
    });
  });
});
