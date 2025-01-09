import { Browser, Page } from "@playwright/test";
import { contactOption, yesNoDontKnow } from "../../../../../common/types.ts";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import {
  CheckAnswersPage
} from "../../../../../pages/citizen/caseView/applicant/confirmContactDetails/checkAnswersPage.ts";
import {
  ApplicantDetailsKnownPage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/applicantDetailsKnownPage.ts";
import {
  ApplicantStartAlternativePage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/applicantStartAlternativePage.ts";
import {
  ApplicantPrivateDetailsConfirmedPage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/applicantPrivateDetailsConfirmedPage.ts";
import {
  ContactPreferencesPage
} from "../../../../../pages/citizen/caseView/applicant/contactPreferences/contactPreferencesPage.ts";
import { ReviewPage } from "../../../../../pages/citizen/caseView/applicant/contactPreferences/reviewPage.ts";
import {
  ConfirmationPage
} from "../../../../../pages/citizen/caseView/applicant/contactPreferences/confirmationPage.ts";


interface daCitizenApplicantDashboardTasksParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event; // the event parameter is meant to represent a different task the applicant can perform on the dashboard
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
  contactOption: contactOption;
}

// add your applicant task to this type to add your task to the switch statement
export type Event = "confirmContactDetails" | "keepDetailsPrivate" | "contactPreferences";


// This enum is used to store the locators for each event <a> tag on the applicant dashboard
enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
  contactPreferencesPrivateSelector = "#contactPreferences",
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
    contactOption,
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
        await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
        await CheckAnswersPage.checkAnswersPage(
          page,
          accessibilityTest
        );
        break;
      case "keepDetailsPrivate":
        await page.click(UniqueSelectors.keepDetailsPrivateSelector);
        await ApplicantDetailsKnownPage.detailsKnownPage(
          page,
          accessibilityTest,
          yesNoDontKnow,
        );
        await ApplicantStartAlternativePage.startAlternativePage({
          page,
          accessibilityTest,
          startAlternativeYesNo,
        });
        await ApplicantPrivateDetailsConfirmedPage.privateDetailsConfirmedPage({
          page,
          accessibilityTest,
          startAlternativeYesNo,
        });
        break;
      case "contactPreferences":
        await page.click(UniqueSelectors.contactPreferencesPrivateSelector);
        await ContactPreferencesPage.contactPreferencesPage(
          page,
          accessibilityTest,
          contactOption,
        );
        await ReviewPage.reviewPage(
          page,
          accessibilityTest,
        );
        await ConfirmationPage.confirmationPage(
          page,
          accessibilityTest,
        );
        break;
    }
  }
}
