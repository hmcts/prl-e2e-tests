import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/confirmContactDetails/applicant/checkAnswersPage.ts";

interface confirmContactDetailsParams {
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
  }: confirmContactDetailsParams): Promise<void> {
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
