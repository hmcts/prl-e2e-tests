import { Page } from "@playwright/test";
import { StartPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/startPage";
import { ChildAddressPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage";
import {
  ConsentAgreementPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage";

interface C100ScreeningSectionsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
}

export class C100ScreeningSections {
  public static async c100ScreeningSections({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: C100ScreeningSectionsOptions): Promise<void> {
    await StartPage.startPage({
      page,
      accessibilityTest,
    });
    await ChildAddressPage.childAddressPage(
      {
        page,
        accessibilityTest,
        errorMessaging,
      },
    );
    await ConsentAgreementPage.consentAgreementPage({
      page,
      accessibilityTest,
      errorMessaging,
      c100ScreeningWrittenAgreementReview,
    });
  }
}
