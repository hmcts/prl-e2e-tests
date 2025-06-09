import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeResolutionPage.ts";
import { AlternativeRoutesPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeRoutesPage.ts";
import { LegalRepresentationPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationPage.ts";
import { LegalRepresentationApplicationPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationPage.ts";
import { ContactRepresentativePage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/contactRepresentativePage.ts";
import { StartPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/startPage.ts";
import { ChildAddressPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage.ts";
import { ConsentAgreementPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage.ts";
import { CitizenCreateInitial } from "../../citizenCreateInitial.ts";
import { CaseDashboardPage } from "../../../../pages/citizen/createCase/initialJourney/caseDashboardPage.ts";

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
