import { Browser, Page } from "@playwright/test";
import { Noc2Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc2Page.ts";
import { NocSubmitPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSubmitPage.ts";
import { NocSuccessfulPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSuccessfulPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { CreateHearingRequest } from "../createHearingRequest/createHearingRequest.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Noc1Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc1Page.ts";
import { submitEvent } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

interface NoticeOfChangeParams {
  page: Page;
  browser: Browser;
  caseType: solicitorCaseCreateType;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

export class NoticeOfChange {
  public static async noticeOfChange({
    page,
    browser,
    caseType,
    caseRef,
    isApplicant,
    accessibilityTest,
  }: NoticeOfChangeParams): Promise<void> {
    await page.getByRole("link", { name: "Notice of change" }).click();
    await Noc1Page.noc1Page(page, caseRef, accessibilityTest);
    await Noc2Page.noc2Page(page, isApplicant, accessibilityTest);
    await NocSubmitPage.nocSubmitPage(page, isApplicant, accessibilityTest);
    await NocSuccessfulPage.nocSuccessfulPage(page, accessibilityTest);
    await this.checkSolicitorOnApplication(page, isApplicant);
    await this.checkHearingRequest(browser, caseType, caseRef);
  }

  private static async checkSolicitorOnApplication(
    page: Page,
    isApplicant: boolean,
  ): Promise<void> {
    await Helpers.clickTab(page, "Application");
    const locatorId: string = isApplicant
      ? "#case-viewer-field-read--fl401ApplicantTable"
      : "#case-viewer-field-read--fl401RespondentTable";
    const solicitorTitle: string = isApplicant
      ? "Applicant Solicitor"
      : "Respondent Solicitor";
    const tableLocator = page.locator(locatorId);
    await tableLocator
      .getByRole("heading", { name: solicitorTitle })
      .isVisible();
    await tableLocator
      .getByRole("link", { name: "prl_aat_solicitor@mailinator.com" })
      .isVisible();
  }

  private static async checkHearingRequest(
    browser: Browser,
    caseType: solicitorCaseCreateType,
    caseRef: string,
  ): Promise<void> {
    if (caseType === "C100") {
      // login as ctsc and issue to local court
      const ctscPage: Page = await Helpers.openNewBrowserWindow(
        browser,
        "courtAdminStoke",
      );
      await submitEvent(ctscPage, caseRef, "issueAndSendToLocalCourtCallback");
    }
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(
      `${config.manageCasesBaseURLCase}/case-details/${caseRef}/hearings`,
    );
    // TODO
    // await CreateHearingRequest.requestAHearing(page, false); // this will almost certainly need tweaking
  }
}
