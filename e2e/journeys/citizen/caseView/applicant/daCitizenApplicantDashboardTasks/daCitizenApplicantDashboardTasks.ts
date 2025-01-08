import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/confirmContactDetails/applicant/checkAnswersPage.ts";
import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/detailsKnownPage.ts";
import { StartAlternativePage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/startAlternativePage.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";
import { PrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/privateDetailsConfirmedPage.ts";
import { IntroPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/introPage.ts";
import { LanguageRequirementsAndSpecialArrangementsPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsPage.ts";
import { HelpCommunicatingAndUnderstandingPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/helpCommunicatingAndUnderstandingPage.ts";
import { ConfirmationPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/confirmationPage.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../config.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ReasonableAdjustmentsReviewPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsReviewPage.ts";
import { ReasonableAdjustmentsSelectionPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsSelectionPage.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewPage.ts";

interface daCitizenApplicantDashboardTasksParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event; // the event parameter is meant to represent a different task the applicant can perform on the dashboard
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
  needsReasonableAdjustment: boolean;
}

// add your applicant task to this type to add your task to the switch statement
export type Event =
  | "confirmContactDetails"
  | "keepDetailsPrivate"
  | "reasonableAdjustments";

// This enum is used to store the locators for each event <a> tag on the applicant dashboard
enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
  supportYouNeedDuringYourCaseSelector = "#supportYouNeed",
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
    needsReasonableAdjustment,
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
      case "reasonableAdjustments":
        await page.click(UniqueSelectors.supportYouNeedDuringYourCaseSelector);
        await IntroPage.introPage(page, accessibilityTest);
        await LanguageRequirementsAndSpecialArrangementsPage.languageRequirementsAndSpecialArrangementsPage(
          page,
          accessibilityTest,
        );
        await LanguageRequirementsAndSpecialArrangementsReviewPage.languageRequirementsAndSpecialArrangementsReviewPage(
          page,
          accessibilityTest,
        );
        await ReasonableAdjustmentsSelectionPage.reasonableAdjustmentsSelectionPage(
          page,
          needsReasonableAdjustment,
        );
        if (needsReasonableAdjustment) {
          await HelpCommunicatingAndUnderstandingPage.helpCommunicatingAndUnderstandingPage(
            page,
          );
        }
        await ReasonableAdjustmentsReviewPage.reasonableAdjustmentsReviewPage(
          page,
        );
        await ConfirmationPage.confirmationPage(page, accessibilityTest);
        if (needsReasonableAdjustment) {
          // login as court admin and check Case Flags are updated with correct reasonable adjustment
          page = await Helpers.openNewBrowserWindow(browser, "caseWorker");
          await Helpers.goToCase(
            page,
            config.manageCasesBaseURL,
            caseRef,
            "tasks",
          );
          await page
            .locator(Selectors.daTasklist, {
              hasText: "Case Flags",
            })
            .click();
          // heck correct party has correct flag
          const caseFlagsLocator = page.locator("ccd-case-flag-table", {
            hasText: "Applicant ApplLast",
          });
          await caseFlagsLocator
            .locator(Selectors.div, {
              hasText: "Lip speaker",
            })
            .isVisible();
        }
        break;
    }
  }
}
