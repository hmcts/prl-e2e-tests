import { yesNoDontKnow } from "../../../../../common/types.ts";
import { Browser, Page } from "@playwright/test";
import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import {
  ApplicantDetailsKnownPage
} from "../../../../../pages/citizen/caseView/keepDetailsPrivate/detailsKnownPage.ts";
import {
  ApplicantStartAlternativePage
} from "../../../../../pages/citizen/caseView/keepDetailsPrivate/startAlternativePage.ts";
import {
  ApplicantPrivateDetailsConfirmedPage
} from "../../../../../pages/citizen/caseView/keepDetailsPrivate/privateDetailsConfirmedPage.ts";

interface keepDetailsPrivateParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
  isApplicant: boolean;
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
  }: keepDetailsPrivateParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
    });
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
  }
}
