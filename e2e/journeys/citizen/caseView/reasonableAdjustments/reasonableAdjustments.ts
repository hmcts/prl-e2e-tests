import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { IntroPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/introPage.ts";
import { LanguageRequirementsAndSpecialArrangementsPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsPage.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewPage.ts";
import { ReasonableAdjustmentsSelectionPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsSelectionPage.ts";
import { HelpCommunicatingAndUnderstandingPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/helpCommunicatingAndUnderstandingPage.ts";
import { ReasonableAdjustmentsReviewPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsReviewPage.ts";
import { ConfirmationPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/confirmationPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { applicationSubmittedBy } from "../../../../common/types.ts";

interface reasonableAdjustmentsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  needsReasonableAdjustment: boolean;
  isApplicant: boolean;
  accessibilityTest: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  supportYouNeedDuringYourCaseSelector = "#supportYouNeed",
}

export class ReasonableAdjustments {
  public static async reasonableAdjustments({
    page,
    browser,
    caseRef,
    needsReasonableAdjustment,
    isApplicant,
    accessibilityTest,
    applicationSubmittedBy,
  }: reasonableAdjustmentsParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
      isManualSOA: false,
    });

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
    await ReasonableAdjustmentsReviewPage.reasonableAdjustmentsReviewPage(page);
    await ConfirmationPage.confirmationPage(page, accessibilityTest);
    if (needsReasonableAdjustment) {
      // login as court admin and check Case Flags are updated with correct reasonable adjustment
      page = await Helpers.openNewBrowserWindow(browser, "caseWorker");
      await Helpers.goToCase(page, config.manageCasesBaseURLCase, caseRef, "tasks");
      await page
        .locator(Selectors.daTasklist, {
          hasText: "Case Flags",
        })
        .click();
      // heck correct party has correct flag
      const applicantOrRespondentName: string = isApplicant
        ? "Applicant ApplLast"
        : "Dolores Smith";
      const caseFlagsLocator = page.locator("ccd-case-flag-table", {
        hasText: applicantOrRespondentName,
      });
      await caseFlagsLocator
        .locator(Selectors.div, {
          hasText: "Lip speaker",
        })
        .isVisible();
    }
  }
}
