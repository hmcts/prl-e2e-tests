import { Browser, BrowserContext, Page } from "@playwright/test";
import IdamLoginHelper from "../../../common/idamLoginHelper.ts";
import Config from "../../../config.ts";
import { AccessCodeHelper } from "../../../common/accessCodeHelper.ts";
import { EnterPinPage } from "../../../pages/citizen/activateCase/enterPinPage.ts";
import { CaseActivatedPage } from "../../../pages/citizen/activateCase/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../../pages/citizen/activateCase/applicantDashboardPage.ts";
import { RespondentDashboardPage } from "../../../pages/citizen/activateCase/respondentDashboardPage.ts";
import { jsonDatas } from "../../../common/solicitorCaseCreatorHelper.ts";
import { Selectors } from "../../../common/selectors.ts";
import { ApplicantDashboardContent } from "../../../fixtures/citizen/activateCase/applicantDashboardContent.ts";
import { RespondentDashboardContent } from "../../../fixtures/citizen/activateCase/respondentDashboardContent.ts";
import { ServiceOfApplication } from "../../manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";
import { completeEventsUpToServiceOfApplication } from "../../../common/caseEventsHelper.ts";

interface ActiveCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  caseUser: CaseUser;
  accessibilityTest: boolean;
  isManualSOA: boolean;
}

export type CaseUser = "applicant" | "respondent" | "both";

export class ActivateCase {
  public static async activateCase({
    page,
    browser,
    caseRef,
    caseUser,
    accessibilityTest,
    isManualSOA,
  }: ActiveCaseParams): Promise<Page> {
    let currentPage: Page = page;
    if (isManualSOA) {
      await ServiceOfApplication.serviceOfApplicationJourney({
        page: page,
        accessibilityTest: accessibilityTest,
        ccdRef: caseRef,
        createOrderFL401Options: "power of arrest",
        browser: browser,
        personallyServed: true,
        yesNoServiceOfApplication4: false,
        responsibleForServing: "courtBailiff",
        manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      });
    } else {
      await completeEventsUpToServiceOfApplication(
        page,
        browser,
        caseRef,
        jsonDatas.manageOrderDataPowerOfArrest,
        "power of arrest",
      );
    }
    switch (caseUser) {
      case "applicant":
        currentPage = await this.checkApplicantDashboard(
          browser,
          caseRef,
          accessibilityTest,
          isManualSOA,
        );
        break;
      case "respondent":
        currentPage = await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
          isManualSOA,
        );
        break;
      case "both":
        await this.checkApplicantDashboard(
          browser,
          caseRef,
          accessibilityTest,
          isManualSOA,
        );
        await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
          isManualSOA,
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
    isManualSOA: boolean,
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
      isManualSOA,
    );
    return page;
  }

  private static async checkRespondentDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
    isManualSOA: boolean,
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
      isManualSOA,
    );
    return page;
  }

  private static async checkDashboard(
    page: Page,
    caseRef: string,
    accessCode: string,
    isApplicant: boolean,
    accessibilityTest: boolean,
    isManualSOA: boolean,
  ): Promise<void> {
    await EnterPinPage.enterPinPage(
      page,
      caseRef,
      accessCode,
      accessibilityTest,
    );
    await CaseActivatedPage.caseActivatedPage(page, caseRef, accessibilityTest);
    if (isApplicant && isManualSOA) {
      await ApplicantDashboardPage.applicantDashboardPage(
        page,
        caseRef,
        accessibilityTest,
      );
    } else if (!isApplicant && isManualSOA) {
      await RespondentDashboardPage.respondentDashboardPage(
        page,
        caseRef,
        accessibilityTest,
      );
    } else if (isApplicant && !isManualSOA) {
      // just check the page heading
      await page
        .locator(Selectors.GovukHeadingXL, {
          hasText: ApplicantDashboardContent.govukHeadingXL,
        })
        .waitFor();
    } else {
      // just check the page heading
      await page
        .locator(Selectors.GovukHeadingXL, {
          hasText: RespondentDashboardContent.govukHeadingXL,
        })
        .waitFor();
    }
  }
}
