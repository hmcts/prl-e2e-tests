import { Page } from "@playwright/test";
import { Noc1Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc1Page.ts";
import { NocSubmitPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSubmitPage.ts";
import { NocSuccessfulPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSuccessfulPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { CreateHearingRequest } from "../createHearingRequest/createHearingRequest.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import idamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";

interface NoticeOfChangeParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

export class NoticeOfChange {
  public static async noticeOfChange({
    page,
    caseType,
    caseRef,
    isApplicant,
    accessibilityTest,
  }: NoticeOfChangeParams): Promise<void> {
    await page.getByRole("link", { name: "Notice of change" }).click();
    await Noc1Page.noc1Page(page, isApplicant, accessibilityTest);
    await NocSubmitPage.nocSubmitPage(page, isApplicant, accessibilityTest);
    await NocSuccessfulPage.nocSuccessfulPage(page, accessibilityTest);
    await page.getByRole("link", { name: "View this case" }).click();
    await this.checkSolicitorOnApplication(page, isApplicant);
    await this.checkHearingRequest(page, caseType, caseRef);
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
    // .locator(Selectors.h3, { hasText: solicitorTitle })
    // .isVisible();
    await tableLocator
      .getByRole("link", { name: "prl_aat_solicitor@mailinator.com" })
      .isVisible();
    // .locator(Selectors.a, { hasText: "prl_aat_solicitor@mailinator.com" })
    // .isVisible();
  }

  private static async checkHearingRequest(
    page: Page,
    caseType: solicitorCaseCreateType,
    caseRef: string,
  ): Promise<void> {
    // TODO: finish this method
    if (caseType === "C100") {
      // login as ctsc and issue to local court
    }
    await idamLoginHelper.signInUser(
      page,
      "caseWorker",
      config.manageCasesBaseURLCase,
    );
    await page.goto(
      `${config.manageCasesBaseURLCase}/case-details/${caseRef}/hearings`,
    );
    // await CreateHearingRequest.requestAHearing(page, false); // this will need tweaking
  }
}
