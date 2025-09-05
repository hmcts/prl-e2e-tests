import { Browser, Locator, Page } from "@playwright/test";
import { Noc2Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc2Page.ts";
import { NocSubmitPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSubmitPage.ts";
import { NocSuccessfulPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSuccessfulPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { CreateHearingRequest } from "../createHearingRequest/createHearingRequest.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Noc1Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc1Page.ts";

interface addBarristerAndRemoveBarristerParams {
  page: Page;
  browser: Browser;
  caseType: solicitorCaseCreateType;
  caseRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
}

export class AddBarristerAndRemoveBarrister {
    public static async addBarristerAndRemoveBarrister({
    page,
    browser,
    caseType,
    caseRef,
    isApplicant,
    accessibilityTest,
    }: addBarristerAndRemoveBarristerParams): Promise<void> {
    //Adding Solicitor via NOC
    await page.getByRole("link", { name: "Notice of change" }).click();
    await Noc1Page.noc1Page(page, caseRef, accessibilityTest);
    await Noc2Page.noc2Page(page, caseType, isApplicant, accessibilityTest);
    await NocSubmitPage.nocSubmitPage(
      page,
      caseType,
      isApplicant,
      accessibilityTest,
    );
    await NocSuccessfulPage.nocSuccessfulPage(page, accessibilityTest);
    await this.checkSolicitorOnApplication(page, caseType, isApplicant);
    //Adding Barrister as the Solicitor
    await AddBarrister.addBarrister();
    await RemoveBarrister.removeBarrister();
        


  }

  private static async checkSolicitorOnApplication(
    page: Page,
    caseType: solicitorCaseCreateType,
    isApplicant: boolean,
  ): Promise<void> {
    const nocSolicitorEmail: string = process.env
      .NOC_SOLICITOR_USERNAME as string;
    await page
      .getByRole("tab", {
        name: "Application",
        exact: false,
      })
      .click();
    let tableLocator: Locator;
    if (caseType === "C100") {
      tableLocator = page.locator(
        isApplicant
          ? "#case-viewer-field-read--applicantTable"
          : "#case-viewer-field-read--respondentTable",
      );
    } else {
      tableLocator = page.locator(
        isApplicant
          ? "#case-viewer-field-read--fl401SolicitorDetailsTable"
          : "#case-viewer-field-read--fl401RespondentTable",
      );
    }
    await tableLocator
      .getByRole("link", { name: nocSolicitorEmail })
      .isVisible();
  }
}
