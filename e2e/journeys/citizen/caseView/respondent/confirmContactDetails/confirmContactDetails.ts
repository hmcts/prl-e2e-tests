import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/confirmContactDetails/respondent/checkAnswersPage.ts";

interface RespondentConfirmContactDetailsParams {
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
  }: RespondentConfirmContactDetailsParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "respondent",
      accessibilityTest: accessibilityTest,
    });
    await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
    await CheckAnswersPage.checkAnswersPage(page, accessibilityTest);
  }
}
