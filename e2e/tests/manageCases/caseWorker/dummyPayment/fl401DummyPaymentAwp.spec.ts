import { test } from "@playwright/test";
import Config from "../../../../config";
import { DummyPaymentAwp } from "../../../../journeys/manageCases/caseWorker/dummyPayment/dummyPaymentAwp";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Dummy payment for AWP tests", (): void => {
  test(`Complete the Dummy payment for AWP action as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Payment status paid. @regression`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
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
      caseType: "FL401",
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
      caseType: "FL401",
    });
  });
});

test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Payment status is paid. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await DummyPaymentAwp.dummyPaymentAwp({
    page,
    errorMessaging: false,
    accessibilityTest: true,
    paymentStatusPaid: true,
    caseType: "FL401",
  });
});
