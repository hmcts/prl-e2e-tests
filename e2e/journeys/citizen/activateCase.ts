import { Browser, Page } from "@playwright/test";
import IdamLoginHelper from "../../common/idamLoginHelper.ts";
import Config from "../../config.ts";
import { AccessCodeHelper } from "../../common/accessCodeHelper.ts";
import { EnterPinPage } from "../../pages/citizen/enterPinPage.ts";
import { CaseActivatedPage } from "../../pages/citizen/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../pages/citizen/applicantDashboardPage.ts";
import { Helpers } from "../../common/helpers.ts";
import { RespondentDashboardPage } from "../../pages/citizen/respondentDashboardPage.ts";

interface ActiveCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
}

export class ActivateCase {
  public static async activateCase({
    page,
    browser,
    caseRef,
    accessibilityTest,
  }: ActiveCaseParams): Promise<void> {
    // TODO: get a case past service of application stage -> NOT served personally
    await this.checkApplicantDashboard(browser, caseRef, accessibilityTest);
    await this.checkRespondentDashboard(browser, caseRef, accessibilityTest);
  }

  private static async checkApplicantDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "citizen");
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
    await page.click(`a:text-is("Activate access code")`);
    let accessCode: string =
      await AccessCodeHelper.getApplicantAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      true,
      accessibilityTest,
    );
  }

  private static async checkRespondentDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "citizen");
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
    await page.click(`a:text-is("Activate access code")`);
    let accessCode: string =
      await AccessCodeHelper.getRespondentAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      false,
      accessibilityTest,
    );
  }

  private static async checkDashboard(
    page: Page,
    caseRef: string,
    accessCode: string,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await EnterPinPage.enterPinPage(
      page,
      caseRef,
      accessCode,
      accessibilityTest,
    );
    await CaseActivatedPage.caseActivatedPage(page, caseRef, accessibilityTest);
    if (isApplicant) {
      await ApplicantDashboardPage.applicantDashboardPage(
        page,
        caseRef,
        accessibilityTest,
      );
    } else {
      await RespondentDashboardPage.respondentDashboardPage(
        page,
        caseRef,
        accessibilityTest,
      );
    }
  }
}
