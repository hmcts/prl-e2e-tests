import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { AllCategoriesPage } from "../../../../pages/citizen/caseView/viewAllDocuments/applicant/allCatergoriesPage.ts";
import {
  ApplicationPackDocumentsPage
} from "../../../../pages/citizen/caseView/viewAllDocuments/applicant/applicationPackDocumentsPage.ts";

interface reasonableAdjustmentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  viewAllDocuments = "#viewAllDocuments",
}

export class ViewAllDocuments {
  public static async applicantViewAllDocuments({
                                              page,
                                              browser,
                                              caseRef,
                                              isApplicant,
                                              accessibilityTest,
                                            }: reasonableAdjustmentsParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
    });

    await page.click(UniqueSelectors.viewAllDocuments);
    await AllCategoriesPage.allCategoriesPage({
      page,
      accessibilityTest,
    });
    await ApplicationPackDocumentsPage.applicationPackDocumentsPage({
      page,
      accessibilityTest,
    })
  }
}