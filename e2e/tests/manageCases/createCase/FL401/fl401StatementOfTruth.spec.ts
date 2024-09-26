import { test } from "@playwright/test";
import Config from "../../../../config";
import {
  Fl401StatementOfTruth
} from "../../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Statement of truth tests @manageCases", (): void => {
  test(`Test the FL401 statement of truth journey with following options:
  Not accessibility testing,
  Not error messaging, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: true,
    });
  });

  test(`Test the FL401 statement of truth journey with following options:
  Not accessibility testing,
  Yes error messaging, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      subJourney: true,
    });
  });
});

test(`Test the FL401 statement of truth journey with following options:
  Yes accessibility testing,
  Not error messaging, @accessibilityManageCases`, async ({
   page,
 }): Promise<void> => {
  await Fl401StatementOfTruth.fl401StatementOfTruth({
    page: page,
    accessibilityTest: false,
    errorMessaging: true,
    subJourney: true,
  });
});