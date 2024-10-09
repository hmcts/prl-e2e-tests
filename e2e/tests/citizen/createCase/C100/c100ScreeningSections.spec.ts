import { test } from "@playwright/test";
import {
  C100ScreeningSections
} from "../../../../journeys/citizen/createCase/C100ScreeningSections/C100ScreeningSections";
import { C100 } from "../../../../journeys/citizen/C100";

test.describe("Manage citizen cases screening sections tests. @citizen", (): void => {
  test(`Test the screening sections part of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  Yes Screening and Written Review`, async ({
    page,
  }): Promise<void> => {
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: true
    })
  });

  test(`Test the screening sections part of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review`, async ({
    page,
  }): Promise<void> => {
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false
    })
  });

  test(`Test the screening sections part of the citizen journey with the following options:
  Not Accessibility Testing,
  Yes Error Messaging,
  No Screening and Written Review`, async ({
    page,
  }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false
    })
  });
})

test(`Test the accessibility of the C100 Screening Sections`, async ({
    page,
  }): Promise<void> => {
  await C100.c100({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100ScreeningWrittenAgreementReview: false
  })
});