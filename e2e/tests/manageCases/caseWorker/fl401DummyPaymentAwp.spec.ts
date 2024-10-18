import { test } from "@playwright/test";
import { DummyPaymentAwp } from "../../../journeys/manageCases/caseWorker/dummyPaymentAwp";
import Config from "../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Dummy payment for AWP tests @manageCases", (): void => {
  test(`Complete the Dummy payment for AWP action as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Payment status paid. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: false,
      isC100: false,
      paymentStatusPaid: true,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Not Payment status paid. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: false,
      isC100: false,
      paymentStatusPaid: false,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Payment status is paid. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: true,
      accessibilityTest: false,
      isC100: false,
      paymentStatusPaid: true,
    });
  });

  test(`Complete the Dummy payment for AWP action  as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Payment status is paid. @accessibilityManageCases`, async ({
    page,
  }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: true,
      isC100: false,
      paymentStatusPaid: true,
    });
  });
});
