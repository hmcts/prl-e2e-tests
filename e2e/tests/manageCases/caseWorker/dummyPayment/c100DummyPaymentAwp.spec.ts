import { test } from "@playwright/test";
import Config from "../../../../utils/config.ts";
import { DummyPaymentAwp } from "../../../../journeys/manageCases/caseWorker/dummyPayment/dummyPaymentAwp";
import { DummyC100 } from "../../../../journeys/manageCases/createCase/dummyCase/dummyC100.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Dummy payment for AWP tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await DummyC100.dummyC100({
      page: page,
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
    });
  });

  test(`Complete the Dummy payment for AWP action as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Payment status paid. @regression`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Not Payment status paid. @regression`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: false,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Payment status is paid. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: true,
      accessibilityTest: false,
      paymentStatusPaid: true,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Payment status is paid. @accessibility`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: true,
      paymentStatusPaid: true,
    });
  });
});
