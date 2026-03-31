import { DummyPaymentAwp } from "../../../../../../../../journeys/manageCases/caseWorker/dummyPayment/dummyPaymentAwp.ts";
import { test } from "../../../../../../../fixtures.js";
import config from "../../../../../../../../utils/config.utils.js";
import { Helpers } from "../../../../../../../../common/helpers.js";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Dummy payment for AWP tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createCACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
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
