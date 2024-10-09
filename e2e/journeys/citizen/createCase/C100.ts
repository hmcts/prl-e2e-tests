import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./C100ScreeningSections/C100ScreeningSections";

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
    c100ScreeningWrittenAgreementReview
  }: C100Options): Promise<void> {

    await C100ScreeningSections.c100ScreeningSections({
      page,
      accessibilityTest,
      errorMessaging,
      c100ScreeningWrittenAgreementReview
    })
  }
}