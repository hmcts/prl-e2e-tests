import { Page } from "@playwright/test";
import { AlternativeResolutionPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeResolutionPage.ts";
import { AlternativeRoutesPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeRoutesPage.ts";
import { LegalRepresentationPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationPage.ts";
import { LegalRepresentationApplicationPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationPage.ts";
import { StartPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/startPage.ts";
import { ChildAddressPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage.ts";
import { ConsentAgreementPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage.ts";
import { PermissionPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/permissionPage.ts";
import { PermissionsWhyPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/permissionsWhyPage.ts";
import { PermissionsRequestPage } from "../../../../../pages/citizen/createCase/C100/c100ScreeningSections/permissionsRequestPage.ts";

interface C100ScreeningSectionsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
}

export class C100ScreeningSections {
  public static async c100ScreeningSections({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
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
      await PermissionPage.permissionPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100CourtPermissionNeeded: c100CourtPermissionNeeded,
      });
      if (c100CourtPermissionNeeded) {
        await PermissionsWhyPage.permissionsWhyPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        });
        await PermissionsRequestPage.permissionsRequestPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        });
      }
    }
  }
}
