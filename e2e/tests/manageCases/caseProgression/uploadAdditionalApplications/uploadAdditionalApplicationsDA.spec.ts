import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { UploadAdditionalApplications } from "../../../../journeys/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Upload additional applications for FL401 tests", (): void => {
  let caseRef;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef =  await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Upload additional C2 application with notice. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await UploadAdditionalApplications.uploadAdditionalApplications({
      page: page,
      caseType: "FL401",
      additionalApplicationType: "c2",
      withNotice: true,
      accessibilityTest: true,
    });
  });

  test(`Upload additional C2 application without notice. @regression`, async ({
    page,
  }): Promise<void> => {
    await UploadAdditionalApplications.uploadAdditionalApplications({
      page: page,
      caseType: "FL401",
      additionalApplicationType: "c2",
      withNotice: false,
      accessibilityTest: false,
    });
  });

  test(`Upload additional Other application. @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await UploadAdditionalApplications.uploadAdditionalApplications({
      page: page,
      caseType: "FL401",
      additionalApplicationType: "other",
      withNotice: true, // with/without notice doesn't affect "Other" application type
      accessibilityTest: true,
    });
  });
});
