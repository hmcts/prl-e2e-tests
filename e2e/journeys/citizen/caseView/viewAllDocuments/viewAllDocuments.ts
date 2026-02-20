import { ActivateCase, CaseUser } from "../../activateCase/activateCase";
import { Browser, Page } from "@playwright/test";
import { AllCategoriesPage } from "../../../../pages/citizen/caseView/viewAllDocuments/allCatergoriesPage";
import { ApplicationPackDocumentsPage } from "../../../../pages/citizen/caseView/viewAllDocuments/applicationPackDocumentsPage";
import { applicationSubmittedBy } from "../../../../common/types";

interface reasonableAdjustmentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
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
    applicationSubmittedBy,
  }: reasonableAdjustmentsParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
      isManualSOA: true, // power of arrest order is not created properly through the API due to generated IDs
    });

    await page.click(UniqueSelectors.viewAllDocuments);
    await AllCategoriesPage.allCategoriesPage({
      page,
      accessibilityTest,
    });
    await ApplicationPackDocumentsPage.applicationPackDocumentsPage({
      page,
      accessibilityTest,
    });
  }
}
