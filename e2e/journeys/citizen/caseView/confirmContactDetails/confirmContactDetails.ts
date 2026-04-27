import { Locator, Page } from "@playwright/test";
import { CheckAnswersPage as CheckAnswersApplicant } from "../../../../pages/citizen/caseView/confirmContactDetails/applicant/checkAnswersPage.ts";
import { CheckAnswersPage as CheckAnswersRespondent } from "../../../../pages/citizen/caseView/confirmContactDetails/respondent/checkAnswersPage.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface confirmContactDetailsParams {
  page: Page;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  noLivingInARefugeRadioSelector = "#isCitizenLivingInRefuge-2",
}

export class ConfirmContactDetails {
  public static async confirmContactDetails({
    page,
    isApplicant,
    accessibilityTest,
  }: confirmContactDetailsParams): Promise<void> {
    const editYourContactDetailsLocator: Locator = page.locator(
      UniqueSelectors.confirmOrEditYourContactDetailsSelector,
    );
    await editYourContactDetailsLocator.click();
    await this.completeStayingInARefuge(page);
    if (isApplicant) {
      await CheckAnswersApplicant.checkAnswersPage(page, accessibilityTest);
    } else {
      await CheckAnswersRespondent.checkAnswersPage(page, accessibilityTest);
    }
  }

  // these pages are already tested in ApplicantStayingInRefugePage.ts
  // so just complete to check the value maps correctly to the summary page
  private static async completeStayingInARefuge(page: Page): Promise<void> {
    const editLivingInRefugeLocator: Locator = page.locator(
      "#citizenUserLivingInRefugeText",
    );
    await editLivingInRefugeLocator.click();
    await page.check(UniqueSelectors.noLivingInARefugeRadioSelector);
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
  }
}
