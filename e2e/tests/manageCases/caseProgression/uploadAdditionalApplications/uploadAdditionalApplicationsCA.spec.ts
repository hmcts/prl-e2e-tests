import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import config from "../../../../config.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { SolicitorCACaseCreator } from "../../../../common/solicitorCACaseCreator.ts";
import { UploadAdditionalApplications } from "../../../../journeys/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Upload additional applications for C100 tests", (): void => {
  let caseRef;

  test.beforeEach(async ({ page }) => {
    await page.goto(Config.manageCasesBaseURL);
    caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
  });

  test(`Upload additional C2 application with notice. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await UploadAdditionalApplications.uploadAdditionalApplications({
      page: page,
      caseType: "C100",
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
      caseType: "C100",
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
      caseType: "C100",
      additionalApplicationType: "other",
      withNotice: true, // with/without notice doesn't affect "Other" application type
      accessibilityTest: true,
    });
  });
});
