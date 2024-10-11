import { test } from "@playwright/test";
import { DummyPaymentAwp } from "../../../journeys/manageCases/caseWorker/dummyPaymentAwp";
import Config from "../../../config";
import { Fl401StatementOfTruth } from "../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("test dummyAwpPayment", (): void => {
  test(`test dummyAwpPayment`, async ({ page }): Promise<void> => {
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: true,
    });
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: true,
      accessibilityTest: true,
      paymentStatusPaid: true,
    });
  });
});
