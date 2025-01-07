import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/applicant/confirmContactDetails/checkAnswersPage.ts";
import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/detailsKnownPage.ts";
import { StartAlternativePage } from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/startAlternativePage.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";
import { PrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/privateDetailsConfirmedPage.ts";

interface daCitizenApplicantDashboardTasksParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event; // the event parameter is meant to represent a different task the applicant can perform on the dashboard
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
}

// add your applicant task to this type to add your task to the switch statement
export type Event = "confirmContactDetails" | "keepDetailsPrivate";


// This enum is used to store the locators for each event <a> tag on the applicant dashboard
enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class DaCitizenApplicantDashboardTasks {
  public static async daCitizenApplicantDashboardTasks({
    page,
    browser,
    caseRef,
    accessibilityTest,
    event,
    startAlternativeYesNo,
    yesNoDontKnow,
  }: daCitizenApplicantDashboardTasksParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "applicant",
      accessibilityTest: accessibilityTest,
    });
    switch (event) {
      case "confirmContactDetails":
        await page.click(
          UniqueSelectors.confirmOrEditYourContactDetailsSelector,
        );
        await CheckAnswersPage.checkAnswersPage(page, accessibilityTest);
        break;
      case "keepDetailsPrivate":
        await page.click(UniqueSelectors.keepDetailsPrivateSelector);
        await DetailsKnownPage.details_knownPage(
          page,
          accessibilityTest,
          yesNoDontKnow,
        );
        await StartAlternativePage.start_alternativePage({
          page,
          accessibilityTest,
          startAlternativeYesNo,
        });
        await PrivateDetailsConfirmedPage.private_details_confirmedPage({
          page,
          accessibilityTest,
          startAlternativeYesNo,
        });
        break;
    }
  }
}
