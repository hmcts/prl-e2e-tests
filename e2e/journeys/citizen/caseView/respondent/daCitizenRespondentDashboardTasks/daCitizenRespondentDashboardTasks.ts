import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { IntroPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/introPage.ts";
import { LanguageRequirementsAndSpecialArrangementsPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsPage.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewPage.ts";
import { ReasonableAdjustmentsSelectionPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsSelectionPage.ts";
import { HelpCommunicatingAndUnderstandingPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/helpCommunicatingAndUnderstandingPage.ts";
import { ReasonableAdjustmentsReviewPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsReviewPage.ts";
import { ConfirmationPage } from "../../../../../pages/citizen/caseView/reasonableAdjustments/confirmationPage.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../config.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { Event } from "../../applicant/daCitizenApplicantDashboardTasks/daCitizenApplicantDashboardTasks.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/confirmContactDetails/respondent/checkAnswersPage.ts";

interface daCitizenRespondentDashboardTasksParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event; // the event parameter is meant to represent a different task the applicant can perform on the dashboard
  needsReasonableAdjustment: boolean;
}

// This enum is used to store the locators for each event <a> tag on the applicant dashboard
enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  supportYouNeedDuringYourCaseSelector = "#supportYouNeed",
}

export class DaCitizenRespondentDashboardTasks {
  public static async daCitizenRespondentDashboardTasks({
    page,
    browser,
    caseRef,
    accessibilityTest,
    event,
    needsReasonableAdjustment,
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
          // check correct party has correct flag
          const caseFlagsLocator = page.locator("ccd-case-flag-table", {
            hasText: "Dolores Smith",
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
