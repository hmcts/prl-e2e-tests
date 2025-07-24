import { test } from "@playwright/test";
import config from "../../../../utils/config.utils.ts";
import { UploadAnOrderC100SolicitorJourney } from "../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderC100SolicitorJourney.ts";
import { UploadAnOrderFL401SolicitorJourney } from "../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderFL401SolicitorJourney.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("'Upload an order' by Solicitor via the 'Draft an Order' event tests", (): void => {
  test(`CA 'Upload an order' as a Solicitor with the following options:
  Case: C100,
  Not accessibility testing.
  @regression, @nightly`, async ({ page, browser }): Promise<void> => {
    await UploadAnOrderC100SolicitorJourney.uploadAnOrderC100SolicitorJourney({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      errorMessaging: false,
      browser: browser,
    });
  });

  test(`CA 'Upload an order' as a Solicitor with the following options:
  Case: C100,
  Accessibility testing: yes.
  @regression, @nightly`, async ({ page, browser }): Promise<void> => {
    await UploadAnOrderC100SolicitorJourney.uploadAnOrderC100SolicitorJourney({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      errorMessaging: false,
      browser: browser,
    });
  });

  test(`DA 'Upload an order' as a Solicitor with the following options:
  Case: FL401,
  Not accessibility testing. 
  @regression, @nightly`, async ({ page, browser }): Promise<void> => {
    await UploadAnOrderFL401SolicitorJourney.uploadAnOrderFL401SolicitorJourney(
      {
        page: page,
        accessibilityTest: false,
        solicitorCaseCreateType: "FL401",
        yesNoManageOrders: false,
        uploadOrderFL401Options: "non-molestation",
        isUploadOrder: true,
        errorMessaging: false,
        browser: browser,
      },
    );
  });

  test(`DA 'Upload an order' as a Solicitor with the following options:
  Case: FL401,
  Accessibility testing: yes.
  @regression, @nightly`, async ({ page, browser }): Promise<void> => {
    await UploadAnOrderFL401SolicitorJourney.uploadAnOrderFL401SolicitorJourney(
      {
        page: page,
        accessibilityTest: true,
        solicitorCaseCreateType: "FL401",
        yesNoManageOrders: false,
        uploadOrderFL401Options: "non-molestation",
        isUploadOrder: true,
        errorMessaging: false,
        browser: browser,
      },
    );
  });
});
