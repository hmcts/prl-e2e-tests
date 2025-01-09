import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { RespondentAllCategoriesPage } from "../../../../../pages/citizen/caseView/respondent/viewAllDocuments/respondentAllCategoriesPage.ts";
import { RespondentApplicationPackDocumentsPage } from "../../../../../pages/citizen/caseView/respondent/viewAllDocuments/respondentApplicationPackDocumentsPage.ts";

interface RespondentConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  viewAllDocumentsSelector = "#viewAllDocuments",
}

export class RespondentViewAllDocuments {
  public static async respondentViewAllDocuments({
    page,
    browser,
    caseRef,
    accessibilityTest,
  }: RespondentConfirmContactDetailsParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "respondent",
      accessibilityTest: accessibilityTest,
    });
    await page.click(UniqueSelectors.viewAllDocumentsSelector);
    await RespondentAllCategoriesPage.allCategoriesPage({
      page,
      accessibilityTest,
    });
    await RespondentApplicationPackDocumentsPage.applicationPackDocumentsPage({
      page,
      accessibilityTest,
    });
  }
}
