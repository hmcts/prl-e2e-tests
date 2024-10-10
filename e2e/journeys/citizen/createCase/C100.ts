import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../../../pages/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../../../pages/c100ScreeningSections/alternativeRoutesPage";
import { LegalRepresentationPage } from "../../../pages/c100ScreeningSections/legalRepresentationPage";
import { LegalRepresentationApplicationPage } from "../../../pages/c100ScreeningSections/legalRepresentationApplicationPage";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation,
  }: C100Options): Promise<void> {
    // Start Pages
    if (c100ScreeningWrittenAgreementReview) {
      // Type Of Order Journey
    } else {
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
      // Remaining Journey PRL-6359
      // MIAM Journey
    }
  }
}
