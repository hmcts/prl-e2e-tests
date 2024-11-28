import { test } from "@playwright/test";
import { FL401WithoutNoticeOrder } from "../../../../journeys/manageCases/createCase/FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case without notice order tests", (): void => {
  test(`Complete the FL401 without notice order event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Yes",
      subJourney: true,
    });
  });

  test(`Complete the FL401 without notice order event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options @regression`, async ({ page }): Promise<void> => {
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isWithoutNoticeDetailsYes: false,
      isWithoutNoticeDetailsBailConditions: "No",
      subJourney: true,
    });
  });

  test(`Complete the FL401 without notice order event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying 'Dont know' to bail conditions,
  Saying yes to all other options @regression`, async ({ page }): Promise<void> => {
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Don't know",
      subJourney: true,
    });
  });
  test(`Complete the FL401 without notice order event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Yes",
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 without notice order event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options @regression,`, async ({
  page,
}): Promise<void> => {
  await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    isWithoutNoticeDetailsYes: true,
    isWithoutNoticeDetailsBailConditions: "Yes",
    subJourney: true,
  });
});

test(`Accessibility test the FL401 without notice order event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying no to all options, @accessibility`, async ({
  page,
}): Promise<void> => {
  await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    isWithoutNoticeDetailsYes: false,
    isWithoutNoticeDetailsBailConditions: "No",
    subJourney: true,
  });
});
