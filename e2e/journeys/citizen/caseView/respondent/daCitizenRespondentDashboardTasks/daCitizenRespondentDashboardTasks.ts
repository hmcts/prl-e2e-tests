import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/respondent/confirmContactDetails/checkAnswersPage.ts";
// import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/respondent/keepDetailsPrivate/detailsKnownPage.ts";
// import { StartAlternativePage } from "../../../../../pages/citizen/caseView/respondent/keepDetailsPrivate/startAlternativePage.ts";
// import { yesNoDontKnow } from "../../../../../common/types.ts";
// import { PrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/respondent/keepDetailsPrivate/privateDetailsConfirmedPage.ts";
import { ConfirmationPage } from "../../../../../pages/citizen/caseView/respondent/contactPreferences/confirmationPage.ts";
import { ReviewPage } from "../../../../../pages/citizen/caseView/respondent/contactPreferences/reviewPage.ts";
import { ContactPreferencesPage } from "../../../../../pages/citizen/caseView/respondent/contactPreferences/contactPreferencesPage.ts";
import { contactOption } from "../../../../../common/types.ts";

interface daCitizenRespondentDashboardTasksParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event; // the event parameter is meant to represent a different task the respondent can perform on the dashboard
  startAlternativeYesNo: boolean;
  // yesNoDontKnow: yesNoDontKnow;
  contactOption: contactOption;
}

// add your respondent task to this type to add your task to the switch statement
export type Event =
  | "confirmContactDetails"
  | "keepDetailsPrivate"
  | "contactPreferences";

// This enum is used to store the locators for each event <a> tag on the respondent dashboard
enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
  contactPreferencesPrivateSelector = "#contactPreferences",
}

export class DaCitizenRespondentDashboardTasks {
  public static async daCitizenRespondentDashboardTasks({
    page,
    browser,
    caseRef,
    accessibilityTest,
    event,
    // startAlternativeYesNo,
    // yesNoDontKnow,
    contactOption,
  }: daCitizenRespondentDashboardTasksParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "respondent",
      accessibilityTest: accessibilityTest,
    });
    switch (event) {
      case "confirmContactDetails":
        await page.click(
          UniqueSelectors.confirmOrEditYourContactDetailsSelector,
        );
        await CheckAnswersPage.checkAnswersPage(page, accessibilityTest);
        break;
      // case "keepDetailsPrivate":
      //   await page.click(UniqueSelectors.keepDetailsPrivateSelector);
      //   await DetailsKnownPage.details_knownPage(
      //     page,
      //     accessibilityTest,
      //     yesNoDontKnow,
      //   );
      //   await StartAlternativePage.start_alternativePage({
      //     page,
      //     accessibilityTest,
      //     startAlternativeYesNo,
      //   });
      //   await PrivateDetailsConfirmedPage.private_details_confirmedPage({
      //     page,
      //     accessibilityTest,
      //     startAlternativeYesNo,
      //   });
      //   break;
      case "contactPreferences":
        await page.click(UniqueSelectors.contactPreferencesPrivateSelector);
        await ContactPreferencesPage.contactPreferencesPage(
          page,
          accessibilityTest,
          contactOption,
        );
        await ReviewPage.reviewPage(page, accessibilityTest);
        await ConfirmationPage.confirmationPage(page, accessibilityTest);
        break;
    }
  }
}
