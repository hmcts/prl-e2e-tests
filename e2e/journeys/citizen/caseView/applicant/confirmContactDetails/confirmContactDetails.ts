import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/applicant/confirmContactDetails/checkAnswersPage.ts";

interface ApplicantConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
}

export class ConfirmContactDetails {
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
    await CheckAnswersPage.checkAnswersPage(page, accessibilityTest);
  }
}
