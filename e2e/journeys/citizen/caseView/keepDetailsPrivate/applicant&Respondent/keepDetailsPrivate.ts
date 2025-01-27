import { yesNoDontKnow } from "../../../../../common/types.ts";
import { Browser, Page } from "@playwright/test";
import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/detailsKnownPage.ts";
import { ApplicantStartAlternativePage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/startAlternativePage.ts";
import { ApplicantPrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/privateDetailsConfirmedPage.ts";
import { applicationSubmittedBy } from "../../../../../common/types.ts";

interface keepDetailsPrivateParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class KeepDetailsPrivate {
  public static async keepDetailsPrivate({
    page,
    browser,
    caseRef,
    accessibilityTest,
    startAlternativeYesNo,
    yesNoDontKnow,
    isApplicant,
    applicationSubmittedBy
  }: keepDetailsPrivateParams): Promise<void> {
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
    await page.click(UniqueSelectors.keepDetailsPrivateSelector);
    if (isApplicant) {
      await DetailsKnownPage.ApplicantDetailsKnownPage(
        page,
        accessibilityTest,
        yesNoDontKnow,
      );
      await ApplicantStartAlternativePage.applicantStartAlternativePage({
        page,
        accessibilityTest,
        startAlternativeYesNo,
        isApplicant,
      });
    } else {
      await DetailsKnownPage.RespondentDetailsKnownPage(
        page,
        accessibilityTest,
        yesNoDontKnow,
      );
      await ApplicantStartAlternativePage.respondentStartAlternativePage({
        page,
        accessibilityTest,
        startAlternativeYesNo,
        isApplicant,
      });
    }
    await ApplicantPrivateDetailsConfirmedPage.privateDetailsConfirmedPage({
      page,
      accessibilityTest,
      startAlternativeYesNo,
      isApplicant,
    });
  }
}
