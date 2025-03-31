import { Browser, Page } from "@playwright/test";
import { ListOfApplications1Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/listOfApplications1Page.ts";
import { ListOfApplications2Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/listOfApplications2Page.ts";
import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { applicationSubmittedBy } from "../../../../../common/types.ts";
import { RequestToOrderWitnessToAttendCourtPage1 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage1.ts";
import { RequestToOrderWitnessToAttendCourtPage2 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage2.ts";
import { RequestToOrderWitnessToAttendCourtPage4 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage4.ts";
import { RequestToOrderWitnessToAttendCourtPage5 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage5.ts";
import { RequestToOrderWitnessToAttendCourtPage6 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage6.ts";
import { RequestToOrderWitnessToAttendCourtPage7 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage7.ts";
import { RequestToOrderWitnessToAttendCourtCYA } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtCYA.ts";
import { RequestToOrderWitnessToAttendCourtPage3 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage3.ts";

interface requestToOrderWitnessToAttendCourtParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
  alreadyCompletedFP25: boolean;
  haveSupportingDocumentsUpload: boolean;
  usingHwf: boolean;
  reasonForUrgency: boolean;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class RequestToOrderWitnessToAttendCourt {
  public static async requestToOrderWitnessToAttendCourt({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
    alreadyCompletedFP25,
    haveSupportingDocumentsUpload,
    usingHwf,
    reasonForUrgency,
  }: requestToOrderWitnessToAttendCourtParams): Promise<void> {
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
    await page.locator("text=Apply to the court using form FP25").click();
    await RequestToOrderWitnessToAttendCourtPage1.requestToOrderWitnessToAttendCourtPage1(
      page,
      accessibilityTest,
    );
    await RequestToOrderWitnessToAttendCourtPage2.requestToOrderWitnessToAttendCourtPage2(
      page,
      accessibilityTest,
      alreadyCompletedFP25,
    );
    await RequestToOrderWitnessToAttendCourtPage3.requestToOrderWitnessToAttendCourtPage3(
      page,
      accessibilityTest,
      usingHwf,
    );
    await RequestToOrderWitnessToAttendCourtPage4.uploadFP25page({
      page,
      accessibilityTest,
    });
    await RequestToOrderWitnessToAttendCourtPage5.requestToOrderWitnessToAttendCourtPage5(
      page,
      accessibilityTest,
      haveSupportingDocumentsUpload,
    );
    await RequestToOrderWitnessToAttendCourtPage6.uploadSupportingDocumentsPage(
      {
        page,
        accessibilityTest,
      },
    );
    await RequestToOrderWitnessToAttendCourtPage7.requestToOrderWitnessToAttendCourtPage6(
      page,
      accessibilityTest,
      reasonForUrgency,
    );
    await RequestToOrderWitnessToAttendCourtCYA.requestToOrderWitnessToAttendCourtCYA(
      page,
      accessibilityTest,
    );
  }
}
