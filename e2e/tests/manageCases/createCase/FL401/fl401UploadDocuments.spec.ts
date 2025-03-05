import { test } from "@playwright/test";
import Config from "../../../../config";
import {
  FL401UploadDocuments
} from "../../../../journeys/manageCases/createCase/FL401UploadDocuments/FL401UploadDocuments";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case Upload Documents tests", (): void => {
  test(`FL401 Upload Documents journey with following options:
  Not accessibility testing,
  Not error messaging`, async ({ page }): Promise<void> => {
    await FL401UploadDocuments.fl401UploadDocuments({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: true,
    });
  });

  test(`FL401 Upload Documents journey with following options:
  Not accessibility testing,
  Yes error messaging, @errorMessage`, async ({ page }): Promise<void> => {
    await FL401UploadDocuments.fl401UploadDocuments({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      subJourney: true,
    });
  });
});

test(`FL401 Upload Documents journey with following options:
  Yes accessibility testing,
  Not error messaging, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401UploadDocuments.fl401UploadDocuments({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    subJourney: true,
  });
});
