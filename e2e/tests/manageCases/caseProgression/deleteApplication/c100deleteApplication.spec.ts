import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Delete CA(C100) application tests in draft state", (): void => {
  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    const caseRef: string = (
      await manageCasesEventUtils.createDraftTSSolicitorCase("C100")
    ).caseRef;
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
