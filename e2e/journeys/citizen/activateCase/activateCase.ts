import { Browser, Page } from "@playwright/test";
import IdamLoginHelper from "../../../common/idamLoginHelper.ts";
import Config from "../../../config.ts";
import { AccessCodeHelper } from "../../../common/accessCodeHelper.ts";
import { EnterPinPage } from "../../../pages/citizen/activateCase/enterPinPage.ts";
import { CaseActivatedPage } from "../../../pages/citizen/activateCase/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../../pages/citizen/activateCase/applicantDashboardPage.ts";
import { Helpers } from "../../../common/helpers.ts";
import { RespondentDashboardPage } from "../../../pages/citizen/activateCase/respondentDashboardPage.ts";
import { CompleteOrderServiceOfApplication } from "../../manageCases/caseProgression/completeOrderServiceOfApplication/completeOrderServiceOfApplication.ts";

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
    await CompleteOrderServiceOfApplication.completeOrderServiceOfApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef: caseRef,
      c100CaseWorkerActions: "Manage orders",
      manageOrdersOptions: "create order",
      createOrderFL401Options: "power of arrest",
      yesNoManageOrders: false,
      judgeTitles: "Her Honour Judge",
      withOrWithoutNotice: true,
      createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
      howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
      browser: browser,
      personallyServed: true,
      yesNoServiceOfApplication4: false,
      responsibleForServing: "courtBailiff", // this isn't used when yesNoServiceOfApplication4 is false
    });
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
