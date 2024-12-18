import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { ApplicantCheckAnswersPage } from "../../../../../pages/citizen/caseView/applicant/confirmContactDetails/applicantCheckAnswersPage.ts";

interface ApplicantConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
}

export class ApplicantConfirmContactDetails {
  public static async confirmContactDetails({
    page,
    browser,
    caseRef,
    accessibilityTest,
  }: ApplicantConfirmContactDetailsParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "applicant",
      accessibilityTest: accessibilityTest,
    });
    await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
    await ApplicantCheckAnswersPage.checkAnswersPage(page, accessibilityTest);
  }
}
