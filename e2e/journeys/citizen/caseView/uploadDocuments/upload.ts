import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { UploadPage } from "../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { applicationSubmittedBy } from "../../../../common/types.ts";

interface uploadParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  uploadDocumentsPrivateSelector = "#uploadDocuments",
}

export class Upload {
  public static async upload({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
  }: uploadParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
      isManualSOA: true,
      yesNoServiceOfApplication4: false,
      confidentialityCheck: true,
    });
    await page.click(UniqueSelectors.uploadDocumentsPrivateSelector);
    await UploadPage.uploadPage(page, accessibilityTest);
  }
}
