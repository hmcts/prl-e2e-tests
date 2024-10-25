import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeResolutionPage";
import { AlternativeRoutesPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeRoutesPage";
import { LegalRepresentationPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationPage";
import { LegalRepresentationApplicationPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationPage";
import { ContactRepresentativePage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/contactRepresentativePage";
import { StartPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/startPage";
import { ChildAddressPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage";
import { ConsentAgreementPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage";
import { CitizenCreateInitial } from "../../citizenCreateInitial";
import { CaseDashboardPage } from "../../../../pages/citizen/createCase/initialJourney/caseDashboardPage";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class C100ApplicationCompletedForYou {
  public static async c100ApplicationCompletedForYou({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100Options): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
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
      c100ScreeningWrittenAgreementReview: false,
    });
    await AlternativeResolutionPage.alternativeResolutionPage({
      page,
      accessibilityTest,
    });
    await AlternativeRoutesPage.alternativeRoutesPage({
      page,
      accessibilityTest,
    });
    await LegalRepresentationPage.legalRepresentationPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100LegalRepresentation: true,
    });
    await LegalRepresentationApplicationPage.legalRepresentationApplicationPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100ApplicationCompletedForYou: true,
      },
    );
    await ContactRepresentativePage.contactRepresentativePage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await CaseDashboardPage.caseDashboardPage({
      page: page,
      accessibilityTest: false,
    });
  }
}
