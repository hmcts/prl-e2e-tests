import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import { DummyPaymentAwp } from "../../../../journeys/manageCases/caseProgression/dummyPayment/dummyPaymentAwp.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Solicitor created C100 Dummy payment for AWP tests", (): void => {
  test(`Complete the Dummy payment for AWP action as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Payment status paid. @regression`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "C100",
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
    });
  });

  test(`Complete the Dummy payment for AWP action as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Not Payment status paid. @regression`, async ({ page }): Promise<void> => {
    await DummyPaymentAwp.dummyPaymentAwp({
      page,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: false,
      caseType: "C100",
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
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
      caseType: "C100",
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
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
    caseType: "C100",
    applicantLivesInRefuge: false,
    otherPersonLivesInRefuge: false,
  });
});
