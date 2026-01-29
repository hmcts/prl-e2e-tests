import { Browser, BrowserContext, Page } from "@playwright/test";
import IdamLoginHelper from "../../../utils/idamLoginHelper.utils.ts";
import Config from "../../../utils/config.utils.ts";
import { AccessCodeHelper } from "../../../utils/accessCode.utils.ts";
import { EnterPinPage } from "../../../pages/citizen/activateCase/enterPinPage.ts";
import { CaseActivatedPage } from "../../../pages/citizen/activateCase/caseActivatedPage.ts";
import { ApplicantDashboardPage } from "../../../pages/citizen/activateCase/applicantDashboardPage.ts";
import { RespondentDashboardPage } from "../../../pages/citizen/activateCase/respondentDashboardPage.ts";
import { jsonDatas } from "../../../common/caseHelpers/jsonDatas.ts";
import { Selectors } from "../../../common/selectors.ts";
import { ApplicantDashboardContent } from "../../../fixtures/citizen/activateCase/applicantDashboardContent.ts";
import { RespondentDashboardContent } from "../../../fixtures/citizen/activateCase/respondentDashboardContent.ts";
import { ServiceOfApplication } from "../../manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";
import { fl401CompleteEventsUpToServiceOfApplication } from "../../../common/caseHelpers/caseEventsHelper.ts";
import { applicationSubmittedBy } from "../../../common/types.ts";
import { ConfidentialityCheck } from "../../manageCases/caseProgression/confidentilityCheck/confidentialityCheck.ts";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";
import { TokenUtils } from "../../../utils/token.utils.ts";

interface ActiveCaseParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  caseUser: CaseUser;
  applicationSubmittedBy: applicationSubmittedBy;
  accessibilityTest: boolean;
  isManualSOA: boolean;
  yesNoServiceOfApplication4: boolean;
  confidentialityCheck: boolean;
}

export type CaseUser = "applicant" | "respondent" | "both";

export class ActivateCase {
  public static async activateCase({
    page,
    browser,
    caseRef,
    caseUser,
    applicationSubmittedBy,
    accessibilityTest,
    isManualSOA,
    yesNoServiceOfApplication4,
    confidentialityCheck,
  }: ActiveCaseParams): Promise<Page> {
    let currentPage: Page = page;
    if (isManualSOA) {
      await ServiceOfApplication.FL401FullServiceOfApplicationJourney({
        page: page,
        accessibilityTest: accessibilityTest,
        ccdRef: caseRef,
        createOrderFL401Options: "power of arrest",
        browser: browser,
        personallyServed: true,
        yesNoServiceOfApplication4: yesNoServiceOfApplication4,
        confidentialityCheck: confidentialityCheck,
        responsibleForServing: "courtBailiff",
        manageOrderData: jsonDatas.citizenManageOrderDataPowerOfArrest,
        applicationSubmittedBy: applicationSubmittedBy,
      });
      // need to complete C8 confidential details event when it is a solicitor case
      // this is a cut down version of the confidential details journey
      if (applicationSubmittedBy == "Solicitor") {
        await ConfidentialityCheck.confidentialityCheckLite(browser, caseRef);
      }
    } else {
      await fl401CompleteEventsUpToServiceOfApplication(
        page,
        browser,
        caseRef,
        jsonDatas.citizenManageOrderDataPowerOfArrest,
        "power of arrest",
        applicationSubmittedBy,
      );
    }
    switch (caseUser) {
      case "applicant":
        currentPage = await this.checkApplicantDashboard(
          browser,
          caseRef,
          accessibilityTest,
          applicationSubmittedBy,
          isManualSOA,
        );
        break;
      case "respondent":
        currentPage = await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
          applicationSubmittedBy,
          isManualSOA,
        );
        break;
      case "both":
        await this.checkApplicantDashboard(
          browser,
          caseRef,
          accessibilityTest,
          applicationSubmittedBy,
          isManualSOA,
        );
        await this.checkRespondentDashboard(
          browser,
          caseRef,
          accessibilityTest,
          applicationSubmittedBy,
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
    applicationSubmittedBy: applicationSubmittedBy,
    isManualSOA: boolean,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext();
    const page: Page = await newContext.newPage();
    const newIdamUtil = await new IdamLoginHelper();
    await newIdamUtil.setupAndSignInUser(
      page,
      Config.citizenFrontendBaseURL,
      "citizen",
    );
    await page.click(`a:text-is("Activate access code")`);
    const newAccessCodeUtil = await new AccessCodeHelper(
      new ServiceAuthUtils(),
      new TokenUtils(new IdamUtils()),
    );
    const accessCode: string =
      await newAccessCodeUtil.getApplicantAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      true,
      accessibilityTest,
      applicationSubmittedBy,
      isManualSOA,
    );
    return page;
  }

  private static async checkRespondentDashboard(
    browser: Browser,
    caseRef: string,
    accessibilityTest: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
    isManualSOA: boolean,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext();
    const page = await newContext.newPage();
    const newIdamUtil = await new IdamLoginHelper();
    await newIdamUtil.setupAndSignInUser(
      page,
      Config.citizenFrontendBaseURL,
      "citizen",
    );
    await page.click(`a:text-is("Activate access code")`);
    const newAccessCodeUtil = await new AccessCodeHelper(
      new ServiceAuthUtils(),
      new TokenUtils(new IdamUtils()),
    );
    const accessCode: string =
      await newAccessCodeUtil.getRespondentAccessCode(caseRef);
    await this.checkDashboard(
      page,
      caseRef,
      accessCode,
      false,
      accessibilityTest,
      applicationSubmittedBy,
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
    applicationSubmittedBy: applicationSubmittedBy,
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
        applicationSubmittedBy,
      );
    } else if (!isApplicant && isManualSOA) {
      await RespondentDashboardPage.respondentDashboardPage(
        page,
        caseRef,
        accessibilityTest,
        applicationSubmittedBy,
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
