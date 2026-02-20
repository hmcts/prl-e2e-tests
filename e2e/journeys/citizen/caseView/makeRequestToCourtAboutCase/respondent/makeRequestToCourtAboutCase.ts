import { ActivateCase, CaseUser } from "../../../activateCase/activateCase";
import { Browser, Page } from "@playwright/test";
import { ListOfApplications1Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/listOfApplications1Page";
import { ListOfApplications2Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/listOfApplications2Page";
import { applicationSubmittedBy } from "../../../../../common/types";

interface makeRequestToCourtAboutCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class MakeRequestToCourtAboutCase {
  public static async makeRequestToCourtAboutCase({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
  }: makeRequestToCourtAboutCaseParams): Promise<void> {
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
    await page.click(UniqueSelectors.requestToCourtAboutYourCase);
    await ListOfApplications1Page.listOfApplications1Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications2Page.listOfApplications2Page(
      page,
      accessibilityTest,
    );
  }
}
