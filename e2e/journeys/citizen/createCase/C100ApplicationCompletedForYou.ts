import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../../../pages/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../../../pages/c100ScreeningSections/alternativeRoutesPage";
import { LegalRepresentationPage } from "../../../pages/c100ScreeningSections/legalRepresentationPage";
import {
  LegalRepresentationApplicationPage
} from "../../../pages/c100ScreeningSections/legalRepresentationApplicationPage";
import { ContactRepresentativePage } from "../../../pages/c100ScreeningSections/contactRepresentativePage";

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
    // Start Pages
    if (c100ScreeningWrittenAgreementReview) {
      // Type Of Order Journey
    } else {
      await AlternativeResolutionPage.alternativeResolutionPage({
        page,
        accessibilityTest
      });
      await AlternativeRoutesPage.alternativeRoutesPage({
        page,
        accessibilityTest
      });
      await LegalRepresentationPage.legalRepresentationPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100LegalRepresentation: true
      });
      await LegalRepresentationApplicationPage.legalRepresentationApplicationPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100ApplicationCompletedForYou: false
      });
      await ContactRepresentativePage.contactRepresentativePage({
        page: page,
        accessibilityTest: accessibilityTest
      });
      // Check Dashboard Loads
    }
  }
}