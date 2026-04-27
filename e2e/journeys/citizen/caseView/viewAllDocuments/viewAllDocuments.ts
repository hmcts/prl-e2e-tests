import { Page } from "@playwright/test";
import { AllCategoriesPage } from "../../../../pages/citizen/caseView/viewAllDocuments/allCatergoriesPage.ts";
import { ApplicationPackDocumentsPage } from "../../../../pages/citizen/caseView/viewAllDocuments/applicationPackDocumentsPage.ts";

interface reasonableAdjustmentsParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicant: boolean;
}

enum UniqueSelectors {
  viewAllDocuments = "#viewAllDocuments",
}

export class ViewAllDocuments {
  public static async viewAllDocuments({
    page,
    accessibilityTest,
    isApplicant,
  }: reasonableAdjustmentsParams): Promise<void> {
    await page.locator(UniqueSelectors.viewAllDocuments).click();
    await AllCategoriesPage.allCategoriesPage({
      page,
      accessibilityTest,
    });
    await ApplicationPackDocumentsPage.applicationPackDocumentsPage({
      page,
      isApplicant,
      accessibilityTest,
    });
  }
}
