import { Browser, BrowserContext, Page } from "@playwright/test";
import IdamLoginHelper from "../../../common/idamLoginHelper.ts";
import Config from "../../../config.ts";
import { AccessCodeHelper } from "../../../common/accessCodeHelper.ts";
import { EnterPinPage } from "../../../pages/citizen/activateCase/enterPinPage.ts";
import { CaseActivatedPage } from "../../../pages/citizen/activateCase/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../../pages/citizen/activateCase/applicantDashboardPage.ts";
import { RespondentDashboardPage } from "../../../pages/citizen/activateCase/respondentDashboardPage.ts";
import { E2eFlowUpToServiceOfApplication } from "../../manageCases/caseProgression/createACaseUpToServiceOfApplicationState/e2eFlowUpToServiceOfApplication.ts";
import { jsonDatas } from "../../../common/solicitorCaseCreatorHelper.ts";

interface ActiveCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  caseUser: CaseUser;
  accessibilityTest: boolean;
}

export type CaseUser = "applicant" | "respondent" | "both";

export class ActivateCase {
  public static async activateCase({
    page,
    browser,
    caseRef,
    caseUser,
    accessibilityTest,
  }: ActiveCaseParams): Promise<Page> {
    let currentPage: Page = page;
    await E2eFlowUpToServiceOfApplication.e2eFlowUpToServiceOfApplication({
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
      manageOrderData: jsonDatas.defaultData,
    });
    switch (caseUser) {
      case "applicant":
        currentPage = await this.checkApplicantDashboard(
          browser,
          caseRef,
          accessibilityTest,
        );
        break;
      case "respondent":
        currentPage = await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
        );
        break;
      case "both":
        await this.checkApplicantDashboard(browser, caseRef, accessibilityTest);
        await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
        );
        break;
      default:
        console.error(
          `Couldn't check dashboard as supplied argument of ${caseUser} does not match any cases`,
        );
    }
    return currentPage;
  }

  private static async checkApplicantDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext();
    const page: Page = await newContext.newPage();
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
    await page.click(`a:text-is("Activate access code")`);
    const accessCode: string =
      await AccessCodeHelper.getApplicantAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      true,
      accessibilityTest,
    );
    return page;
  }

  private static async checkRespondentDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext();
    const page = await newContext.newPage();
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
    await page.click(`a:text-is("Activate access code")`);
    const accessCode: string =
      await AccessCodeHelper.getRespondentAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      false,
      accessibilityTest,
    );
    return page;
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
