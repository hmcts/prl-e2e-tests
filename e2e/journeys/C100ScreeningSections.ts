import { Page } from "@playwright/test";
import { C100ScreeningSectionStartPage } from "../pages/c100ScreeningSections/c100ScreeningSectionStartPage";

interface C100ScreeningSectionsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
}

export class C100ScreeningSections{
  private static async c100ScreeningSections({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview
  }: C100ScreeningSectionsOptions): Promise<void> {
    await C100ScreeningSectionStartPage.c100ScreeningSectionStartPage({
      page,
      accessibilityTest
    });
  }
}