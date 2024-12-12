import { Browser, Page } from "@playwright/test";
import IdamLoginHelper from "../../common/idamLoginHelper.ts";
import Config from "../../config.ts";
import { AccessCodeHelper } from "../../common/accessCodeHelper.ts";
import { EnterPinPage } from "../../pages/citizen/enterPinPage.ts";
import { CaseActivatedPage } from "../../pages/citizen/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../pages/citizen/applicantDashboardPage.ts";

interface ActiveCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

export class ActivateCase {
  public static async activateCase({
    page,
    browser,
    caseRef,
    isApplicant,
    accessibilityTest,
  }: ActiveCaseParams): Promise<void> {
    // TODO: get order past service of application stage
    // TODO: manually create case to this stage and then run this part of the test onwards
    caseRef = "1734016224844412"; // ref of manually created case - to be removed
    // page = await Helpers.openNewBrowserWindow(browser, "citizen");
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
    await page.click(`a:text-is("Activate access code")`);
    let accessCode;
    if (isApplicant) {
      accessCode = await AccessCodeHelper.getApplicantAccessCode(caseRef);
    } else {
      accessCode = await AccessCodeHelper.getRespondentAccessCode(caseRef);
    }
    await EnterPinPage.enterPinPage(
      page,
      caseRef,
      accessCode,
      accessibilityTest,
    );
    await CaseActivatedPage.caseActivatedPage(page, caseRef, accessibilityTest);
    await ApplicantDashboardPage.applicantDashboardPage(
      page,
      caseRef,
      isApplicant,
      accessibilityTest,
    );
  }
}
