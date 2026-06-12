import { expect, Page } from "@playwright/test";
import { IntroPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/introPage.ts";
import { LanguageRequirementsAndSpecialArrangementsPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsPage.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewPage.ts";
import { ConfirmationPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/confirmationPage.ts";
import {
  CitizenC100CaseUtils,
} from "../../../../utils/citizenC100CaseUtils.js";

interface reasonableAdjustmentsParams {
  page: Page;
  needsReasonableAdjustment: boolean;
  accessibilityTest: boolean;
  isApplicant: boolean;
  citizenC100CaseUtils: CitizenC100CaseUtils;
  caseRef: string;
}

enum UniqueSelectors {
  supportYouNeedDuringYourCaseSelector = "#supportYouNeed",
}

export class ReasonableAdjustments {
  public static async reasonableAdjustments({
    page,
    accessibilityTest,
  }: reasonableAdjustmentsParams): Promise<void> {
    await page
      .locator(UniqueSelectors.supportYouNeedDuringYourCaseSelector)
      .click();
    await IntroPage.introPage(page, accessibilityTest);
    await LanguageRequirementsAndSpecialArrangementsPage.languageRequirementsAndSpecialArrangementsPage(
      page,
      accessibilityTest,
    );
    await LanguageRequirementsAndSpecialArrangementsReviewPage.languageRequirementsAndSpecialArrangementsReviewPage(
      page,
      accessibilityTest,
    );
    await ConfirmationPage.confirmationPage(page, accessibilityTest);
    // There won't be a 'Requested' status flag anymore after the confirmation screen. 
    // Now it will raise a WA task in EXUI called 'Review support request' where the caseworker can create a case flag from it.
  }
}
