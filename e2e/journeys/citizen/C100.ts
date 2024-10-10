import { Page } from "@playwright/test";
import { CitizenCreateInitial } from "./citizenCreateInitial";
import { C100ScreeningSections } from "./createCase/C100ScreeningSections/C100ScreeningSections";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: C100Options): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: false,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page,
      accessibilityTest,
      errorMessaging,
      c100ScreeningWrittenAgreementReview,
    });
    if (c100ScreeningWrittenAgreementReview) {
      // Type Of Order Journey
    } else {
      // MIAM journey
    }
  }
}
