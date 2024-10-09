import { Page } from "@playwright/test";

interface C100ScreeningSectionsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
}

export class C100ScreeningSections {
  private static async c100ScreeningSections({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: C100ScreeningSectionsOptions): Promise<void> {
    // PRL-6357
    if (!c100ScreeningWrittenAgreementReview) {

    }
  }
}
