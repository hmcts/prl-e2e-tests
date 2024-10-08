import { Page } from "@playwright/test";
import { C100ScreeningSectionStartPage } from "../pages/c100ScreeningSections/c100ScreeningSectionStartPage";
import { C100ScreeningSectionChildAddressPage } from "../pages/c100ScreeningSections/c100ScreeningSectionChildAddressPage";
import {
  C100ScreeningSectionConsentAgreementPage
} from "../pages/c100ScreeningSections/c100ScreeningSectionConsentAgreementPage";

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
    await C100ScreeningSectionStartPage.c100ScreeningSectionStartPage({
      page,
      accessibilityTest,
    });
    await C100ScreeningSectionChildAddressPage.c100ScreeningSectionsChildAddressPage(
      {
        page,
        accessibilityTest,
        errorMessaging,
      },
    );
    await C100ScreeningSectionConsentAgreementPage.c100ScreeningSectionsConsentAgreementPage({
      page,
      accessibilityTest,
      errorMessaging,
      c100ScreeningWrittenAgreementReview,
    });
  }
}
