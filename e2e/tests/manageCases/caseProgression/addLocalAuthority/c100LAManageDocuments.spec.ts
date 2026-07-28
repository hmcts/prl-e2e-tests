import { test } from "../../../fixtures.ts";
import { AdminAddLocalAuthority } from "../../../../journeys/manageCases/caseProgression/addLocalAuthority/adminAddLocalAuthority.ts";
import { LocalAuthorityManageDocuments } from "../../../../journeys/manageCases/caseProgression/addLocalAuthority/localAuthorityManageDocuments.ts";
import Config from "../../../../utils/config.utils.ts";
test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe.configure({ mode: "serial" });

test.describe("Add local authority event for C100 case tests as a Local Authority User.", () => {
  let ccdRef: string = "";

  test.beforeAll(async ({ browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
  });

  test("Complete Add Local Authority with accessibility test. @nightly @regression @accessibility @tp", async ({
    page,
    browser,
    navigationUtils,
  }): Promise<void> => {
    await navigationUtils.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );

    await AdminAddLocalAuthority.adminAddLocalAuthority({
      page,
      browser,
      accessibilityTest: false,
      organisationName: "Local Authority Private Law AAT Test Organisation",
      caseRef: ccdRef,
      localAuthorityUserEmail: Config.userCredentials.localAuthority.email,
    });
  });

  test("Local authority uploads documents and admin reviews tasks. @nightly @regression @tp", async ({
    browser,
  }): Promise<void> => {
    await LocalAuthorityManageDocuments.manageDocuments({
      browser,
      caseRef: ccdRef,
      accessibilityTest: false,
    });
  });
});
