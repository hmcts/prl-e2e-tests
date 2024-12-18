import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { RespondentCheckAnswersPage } from "../../../../../pages/citizen/caseView/respondent/confirmContactDetails/respondentCheckAnswersPage.ts";

interface RespondentConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
}

export class RespondentConfirmContactDetails {
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
    await RespondentCheckAnswersPage.checkAnswersPage(page, accessibilityTest);
  }
}
