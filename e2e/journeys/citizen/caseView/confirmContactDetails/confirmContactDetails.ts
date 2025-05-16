import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { CheckAnswersPage as CheckAnswersApplicant } from "../../../../pages/citizen/caseView/confirmContactDetails/applicant/checkAnswersPage.ts";
import { CheckAnswersPage as CheckAnswersRespondent } from "../../../../pages/citizen/caseView/confirmContactDetails/respondent/checkAnswersPage.ts";
import Config from "../../../../utils/config.utils.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { applicationSubmittedBy } from "../../../../common/types.ts";

interface confirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  noLivingInARefugeRadioSelector = "#isCitizenLivingInRefuge-2",
}

export class ConfirmContactDetails {
  public static async confirmContactDetails({
    page,
    browser,
    caseRef,
    isApplicant,
    accessibilityTest,
    applicationSubmittedBy,
  }: confirmContactDetailsParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      applicationSubmittedBy: applicationSubmittedBy,
      accessibilityTest: accessibilityTest,
      isManualSOA: false,
    });
    await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
    await this.completeStayingInARefuge(page, isApplicant);
    if (isApplicant) {
      await CheckAnswersApplicant.checkAnswersPage(page, accessibilityTest);
    } else {
      await CheckAnswersRespondent.checkAnswersPage(page, accessibilityTest);
    }
  }

  // these pages are already tested in ApplicantStayingInRefugePage.ts
  // so just complete to check the value maps correctly to the summary page
  private static async completeStayingInARefuge(
    page: Page,
    isApplicant: boolean,
  ): Promise<void> {
    const applicantRespondentUrlParam = isApplicant
      ? "applicant"
      : "respondent";
    // complete staying in refuge
    await page.goto(
      `${Config.citizenFrontendBaseURL}${applicantRespondentUrlParam}/refuge/staying-in-refuge`,
    );
    await page.check(UniqueSelectors.noLivingInARefugeRadioSelector);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    // confirm address
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
