import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Delete DA(FL401) application tests in draft state", (): void => {
  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    const caseRef: string = (
      await manageCasesEventUtils.createDraftTSSolicitorCase("FL401")
    ).caseRef;
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
