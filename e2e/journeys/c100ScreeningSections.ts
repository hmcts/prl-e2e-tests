import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../pages/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../pages/c100ScreeningSections/alternativeRoutesPage";

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
    // PRL-6357 work
    if (!c100ScreeningWrittenAgreementReview) {
      await AlternativeResolutionPage.alternativeResolutionPage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AlternativeRoutesPage.alternativeRoutesPage({
        page,
        accessibilityTest,
      });
    }
  }
}
