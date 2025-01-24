import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { RespondentDetailsKnownPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/respondent/respondentDetailsKnownPage.ts";
import { applicationSubmittedBy, yesNoDontKnow } from "../../../../../common/types.ts";
import { Browser, Page } from "@playwright/test";
import { RespondentStartAlternativePage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/respondent/respondentStartAlternativePage.ts";
import { RespondentPrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/respondent/RespondentPrivateDetailsConfirmedPage.ts";

interface RespondentConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  yesNoDontKnow: yesNoDontKnow;
  startAlternativeYesNo: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class KeepDetailsPrivate {
  public static async keepDetailsPrivate({
    page,
    browser,
    caseRef,
    accessibilityTest,
    yesNoDontKnow,
    startAlternativeYesNo,
    applicationSubmittedBy,
  }: RespondentConfirmContactDetailsParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "respondent",
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
    });
    await page.click(UniqueSelectors.keepDetailsPrivateSelector);
    await RespondentDetailsKnownPage.respondentDetailsKnownPage(
      page,
      accessibilityTest,
      yesNoDontKnow,
    );
    await RespondentStartAlternativePage.respondentStartAlternativePage({
      page,
      accessibilityTest,
      startAlternativeYesNo,
    });
    await RespondentPrivateDetailsConfirmedPage.respondentPrivateDetailsConfirmedPage(
      {
        page,
        accessibilityTest,
        startAlternativeYesNo,
      },
    );
  }
}
