import { test } from "@playwright/test";
import {
  FL401UploadDocuments
} from "../../../../journeys/manageCases/createCase/FL401UploadDocuments/FL401UploadDocuments";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case type of application tests @manageCases", (): void => {
  test(`Test the FL401 Upload Documents journey with following options:
  Not accessibility testing,
  Not error messaging, @crossbrowserManageCases`, async({ page }): Promise<void> => {
    await FL401UploadDocuments.fl401UploadDocuments({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: true
    })
  })
})