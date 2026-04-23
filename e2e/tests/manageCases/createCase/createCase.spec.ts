import { test } from "@playwright/test";
import Config from "../../../utils/config.utils.ts";
import { SolicitorCreateInitial } from "../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
test.describe("Manage cases case solicitor create case tests.", (): void => {
  test(`Create a C100 case as a solicitor - initial screens only.
  @smoke`, async ({ page }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      solicitorCaseType: "C100",
      errorMessaging: false,
    });
  });

  test(`Create an FL401 case as a solicitor - initial screens only.
  @smoke`, async ({ page }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      solicitorCaseType: "FL401",
      errorMessaging: false,
    });
  });
});
