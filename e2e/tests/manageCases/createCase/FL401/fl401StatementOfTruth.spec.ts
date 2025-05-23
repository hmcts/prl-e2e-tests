import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils";
import { Fl401StatementOfTruth } from "../../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Statement of truth tests", (): void => {
  test(`FL401 statement of truth journey with following options:
  Not accessibility testing,
  Not error messaging,
  Yes to everything before,
  @regression`, async ({ page }): Promise<void> => {
    test.slow();
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: true,
      subJourney: true,
    });
  });

  test(`FL401 statement of truth journey with following options:
  Not accessibility testing,
  Not error messaging,
  No to everything before, @regression`, async ({ page }): Promise<void> => {
    test.slow();
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: true,
    });
  });

  test(`FL401 statement of truth journey with following options:
  Not accessibility testing,
  Yes error messaging,
  No to everything before,
  @regression @errorMessage`, async ({ page }): Promise<void> => {
    test.slow();
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      fl401YesNoToEverything: false,
      subJourney: true,
    });
  });
});

test(`FL401 statement of truth journey with following options:
  Yes accessibility testing,
  Not error messaging, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  test.slow();
  await Fl401StatementOfTruth.fl401StatementOfTruth({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    fl401YesNoToEverything: true,
    subJourney: true,
  });
});
