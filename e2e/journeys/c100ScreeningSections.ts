import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../pages/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../pages/c100ScreeningSections/alternativeRoutesPage";
import { LegalRepresentationPage } from "../pages/c100ScreeningSections/legalRepresentationPage";
import { LegalRepresentationApplicationPage } from "../pages/c100ScreeningSections/legalRepresentationApplicationPage";
import { StartPage } from "../pages/citizen/createCase/C100/c100ScreeningSections/startPage";
import { ChildAddressPage } from "../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage";
import { ConsentAgreementPage } from "../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage";

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
    c100LegalRepresentation,
  }: C100ScreeningSectionsOptions): Promise<void> {
    await StartPage.startPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await ChildAddressPage.childAddressPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await ConsentAgreementPage.consentAgreementPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: c100ScreeningWrittenAgreementReview,
    });
    if (!c100ScreeningWrittenAgreementReview) {
      await AlternativeResolutionPage.alternativeResolutionPage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AlternativeRoutesPage.alternativeRoutesPage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await LegalRepresentationPage.legalRepresentationPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100LegalRepresentation: c100LegalRepresentation,
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
