import { test } from "@playwright/test";
import { FL401UploadDocuments } from "../../../../journeys/manageCases/createCase/FL401UploadDocuments/FL401UploadDocuments";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case Upload Documents tests", (): void => {
  test(`Test the FL401 Upload Documents journey with following options:
  Not accessibility testing,
  Not error messaging @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401UploadDocuments.fl401UploadDocuments({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: true,
    });
  });

  test(`Test the FL401 Upload Documents journey with following options:
  Not accessibility testing,
  Yes error messaging, @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401UploadDocuments.fl401UploadDocuments({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      subJourney: true,
    });
  });
});

test(`Test the FL401 Upload Documents journey with following options:
  Yes accessibility testing,
  Not error messaging, @accessibility`, async ({
  page,
}): Promise<void> => {
  await FL401UploadDocuments.fl401UploadDocuments({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    subJourney: true,
  });
});
