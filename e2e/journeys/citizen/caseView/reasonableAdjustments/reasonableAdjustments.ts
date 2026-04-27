import { expect, Page } from "@playwright/test";
import { IntroPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/introPage.ts";
import { LanguageRequirementsAndSpecialArrangementsPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsPage.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewPage.ts";
import { ReasonableAdjustmentsSelectionPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsSelectionPage.ts";
import { HelpCommunicatingAndUnderstandingPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/helpCommunicatingAndUnderstandingPage.ts";
import { ReasonableAdjustmentsReviewPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsReviewPage.ts";
import { ConfirmationPage } from "../../../../pages/citizen/caseView/reasonableAdjustments/confirmationPage.ts";
import {
  CaseFlagInfo,
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
    needsReasonableAdjustment,
    accessibilityTest,
    isApplicant,
    citizenC100CaseUtils,
    caseRef,
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
      // check case flags added via API request for case data - no need to actually go to ExUI
      const caseFlagInfo: CaseFlagInfo =
        await citizenC100CaseUtils.fetchCitizenCreatedCaseFlags(
          caseRef,
          isApplicant,
        );
      expect(caseFlagInfo.caseFlagName).toEqual("Lip speaker");
      expect(caseFlagInfo.status).toEqual("Requested");
      if (isApplicant) {
        expect(caseFlagInfo.partyName).toEqual("John Doe");
      } else {
        expect(caseFlagInfo.partyName).toEqual("Mary Richards");
      }
    }
  }
}
