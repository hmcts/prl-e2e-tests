import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../pages/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../pages/c100ScreeningSections/alternativeRoutesPage";
import { LegalRepresentationPage } from "../pages/c100ScreeningSections/legalRepresentationPage";
import { LegalRepresentationApplicationPage } from "../pages/c100ScreeningSections/legalRepresentationApplicationPage";

interface C100ScreeningSectionsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
  c100LegalRepresentation: boolean;
}

export class C100ScreeningSections {
  public static async c100ScreeningSections({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation
  }: C100ScreeningSectionsOptions): Promise<void> {
    // PRL-6357 work
    if (!c100ScreeningWrittenAgreementReview) {
      await AlternativeResolutionPage.alternativeResolutionPage({
        page,
        accessibilityTest,
      });
      await AlternativeRoutesPage.alternativeRoutesPage({
        page,
        accessibilityTest,
      });
      await LegalRepresentationPage.legalRepresentationPage({
        page,
        accessibilityTest,
        errorMessaging,
        c100LegalRepresentation,
      });
      if (c100LegalRepresentation) {
        await LegalRepresentationApplicationPage.legalRepresentationApplicationPage(
          {
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            c100ApplicationCompletedForYou: false, // false for this journey because otherwise the application ends
          },
        );
      }
      // PRL-6359 work
    }
  }
}
