import Config from "../../../../utils/config.utils.ts";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.js";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Delete DA(FL401) application tests in draft state", (): void => {
  test.beforeEach(async ({ page, caseEventUtils }) => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef: string = await caseEventUtils.createTSSolicitorCase(
      page,
      "FL401",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Delete FL401 drafted case as a solicitor with the following options:
  Case: FL401,
  Accessibility testing: yes.
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await DeleteApplication.deleteApplication({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
    });
  });
});
