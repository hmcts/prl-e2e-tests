import { applicationSubmittedBy } from "../../../../common/types.ts";
import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";

interface checkTheApplicationParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  yourApplicationApplicant = "#yourApplicationPDF",
  checkTheApplicationRespondent = "#checkTheApplication",
}

export class CheckTheApplication {
  public static async checkTheApplication({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
  }: checkTheApplicationParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page,
      browser,
      caseRef,
      caseUser,
      accessibilityTest,
      applicationSubmittedBy,
      isManualSOA: true,
      yesNoServiceOfApplication4: false,
      confidentialityCheck: applicationSubmittedBy === "Solicitor",
    });
    if (isApplicant) {
      await page.click(UniqueSelectors.yourApplicationApplicant);
    } else {
      await page.click(UniqueSelectors.checkTheApplicationRespondent);
    }
    await page.waitForTimeout(2000);
  }
}
